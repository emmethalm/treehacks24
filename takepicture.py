import olympe
import os
from olympe.messages.ardrone3.Piloting import TakeOff, moveBy, Landing
from olympe.messages.ardrone3.PilotingState import FlyingStateChanged

DRONE_IP = os.environ.get("DRONE_IP", "192.168.42.1")

def takepicture():
    drone = olympe.Drone(DRONE_IP)
    drone.connect()

    # Take picture from current position
    # Have an array of picture camera angles to pass to the drone. Can use different animations.

if __name__ == "__main__":
    takepicture()