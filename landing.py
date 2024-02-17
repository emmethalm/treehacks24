import olympe
import os
import time
from olympe.messages.ardrone3.Piloting import TakeOff, Landing

DRONE_IP = os.environ.get("DRONE_IP", "10.202.0.1")


def landing():
    drone = olympe.Drone(DRONE_IP)
    drone.connect()
    
    assert drone(Landing()).wait().success()
    drone.disconnect()


if __name__ == "__main__":
    landing()