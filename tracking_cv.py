import numpy as np
import cv2
import csv
import math
import os
import queue
import shlex
import subprocess
import tempfile
import threading

import olympe
from olympe.messages.ardrone3.Piloting import TakeOff, Landing
from olympe.messages.ardrone3.Piloting import moveBy
from olympe.messages.ardrone3.PilotingState import FlyingStateChanged
from olympe.messages.ardrone3.PilotingSettings import MaxTilt
from olympe.messages.ardrone3.PilotingSettingsState import MaxTiltChanged
from olympe.messages.ardrone3.GPSSettingsState import GPSFixStateChanged
from olympe.video.renderer import PdrawRenderer

olympe.log.update_config({"loggers": {"olympe": {"level": "WARNING"}}})

DRONE_IP = os.environ.get("DRONE_IP", "10.202.0.1")
# DRONE_RTSP_PORT = os.environ.get("DRONE_RTSP_PORT")
HFOV = 68 # degrees

# Video specifications
# Resolution:

# 4K UHD: 3840x2160 - 24/25/30 fps
# 1080p: 1920x1080 - 24/25/30/48/50/60 fps
# HDR 10: 4K UHD/1080p - 24/25/30 fps

# HDR 8: for all resolutions

# TODO 
# video stream -> frame -> convert frame to work with CV2 [done]

# -> detect people in frame -> get bounding boxes with pixel coordinates
# -> use pixel coordinates and video FOV to calculate vertical and horizontal angle away from center of frame
# -> plug azimuth and elevation into FollowMe to control the drone

hog = cv2.HOGDescriptor()
hog.setSVMDetector(cv2.HOGDescriptor_getDefaultPeopleDetector())

class StreamingExample:
    def __init__(self):
        # Create the olympe.Drone object from its IP address
        self.drone = olympe.Drone(DRONE_IP)
        # self.tempd = tempfile.mkdtemp(prefix="olympe_streaming_test_")
        # print(f"Olympe streaming example output dir: {self.tempd}")
        # self.h264_frame_stats = []
        # self.h264_stats_file = open(os.path.join(self.tempd, "h264_stats.csv"), "w+")
        # self.h264_stats_writer = csv.DictWriter(
        #    self.h264_stats_file, ["fps", "bitrate"]
        # )
        #self.h264_stats_writer.writeheader()
        self.frame_queue = queue.Queue()
        self.processing_thread = threading.Thread(target=self.yuv_frame_processing)
        self.renderer = None

    def start(self):
        # Connect to drone
        assert self.drone.connect(retry=3)

        # if DRONE_RTSP_PORT is not None:
        #     self.drone.streaming.server_addr = f"{DRONE_IP}:{DRONE_RTSP_PORT}"

        # You can record the video stream from the drone if you plan to do some
        # post processing.
        # self.drone.streaming.set_output_files(
        #     video=os.path.join(self.tempd, "streaming.mp4"),
        #     metadata=os.path.join(self.tempd, "streaming_metadata.json"),
        # )

        # Setup your callback functions to do some live video processing
        self.drone.streaming.set_callbacks(
            raw_cb=self.process_frame_cb,
        )
        # Start video streaming
        self.drone.streaming.start()
        self.renderer = PdrawRenderer(pdraw=self.drone.streaming)
        self.running = True
        self.processing_thread.start()

    def stop(self):
        self.running = False
        self.processing_thread.join()
        if self.renderer is not None:
            self.renderer.stop()
        # Properly stop the video stream and disconnect
        assert self.drone.streaming.stop()
        assert self.drone.disconnect()
        # self.h264_stats_file.close()

    # places new decoded frame in the queue for yuv_frame_processing to pick up
    def process_frame_cb(self, yuv_frame):
        yuv_frame.ref()
        self.frame_queue.put_nowait(yuv_frame)
    
    # the processing_thread created above runs this function
    def yuv_frame_processing(self):
        while self.running:
            try:
                frame = self.frame_queue.get(timeout=1)
            except queue.Empty:
                continue
            # Do some live video processing here
            # For example, let's compute the frame rate and the bitrate of the h264 stream
            # frame_stats = frame.info().get_latest_frame_stats()
            # if frame_stats is not None:
            #     self.h264_frame_stats.append(frame_stats)
            #     self.h264_stats_writer.writerow(
            #         {
            #             "fps": frame_stats["fps"],
            #             "bitrate": frame_stats["bitrate"],
            #         }
            #     )
            #     self.h264_stats_file.flush()

            # Convert the yuv frame to a format opencv can use
            info = frame.info()
            height, width = (  # noqa
                info["raw"]["frame"]["info"]["height"],
                info["raw"]["frame"]["info"]["width"],
            )
            cv2_cvt_color_flag = {
                olympe.VDEF_I420: cv2.COLOR_YUV2BGR_I420,
                olympe.VDEF_NV12: cv2.COLOR_YUV2BGR_NV12,
            }[frame.format()]
            cv2frame = cv2.cvtColor(frame.as_ndarray(), cv2_cvt_color_flag)
            # Release the YUV frame
            frame.unref()

        # TODO: -> detect people in frame -> get bounding boxes with pixel coordinates

        # detect people in the frame
        boxes, weights = hog.detectMultiScale(cv2frame, winStride=(4, 4), padding=(8, 8), scale=1.05)

        # Draw bounding boxes around detected people
        for (x, y, w, h) in boxes:
            cv2.rectangle(cv2frame, (x, y), (x + w, y + h), (0, 255, 0), 2)

            # Calculate the azimuth and elevation angles
            target_azimuth, target_elevation = self.calculateAngles(x, y, w, h, width, height)

            # Control the drone to follow the detected person
            self.FollowMe(target_azimuth, target_elevation)

        # TODO: -> use pixel coordinates and video FOV to calculate vertical and horizontal angle away from center of frame
        def calculateAngles(self, x, y, w, h, frame_width, frame_height):
        # Calculate the center of the bounding box
            center_x = x + w / 2
            center_y = y + h / 2

            # Normalize the pixel coordinates to -0.5 to 0.5
            normalized_x = (center_x / width) - 0.5
            normalized_y = (center_y / height) - 0.5

            # Calculate the azimuth and elevation angles
            # Assuming the FOV is the same in both horizontal and vertical directions
            target_azimuth = normalized_x * HFOV
            target_elevation = normalized_y * HFOV

            return target_azimuth, target_elevation
        
        # TODO: -> plug azimuth and elevation into FollowMe to control the drone

        def FollowMe(self, target_azimuth, target_elevation, change_of_scale=1.0, confidence_index=1.0, is_new_selection=True, timestamp=0):
            assert olympe.messages.follow_me.target_image_detection(target_azimuth, target_elevation, change_of_scale, confidence_index, is_new_selection, timestamp, _timeout=10, _no_expect=False, _float_tol=(1e-07, 1e-09))