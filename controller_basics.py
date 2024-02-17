import olympe
import os
import time
from olympe.messages.ardrone3.Piloting import TakeOff, Landing
from olympe.messages.ardrone3.PilotingState import FlyingStateChanged

DRONE_IP = os.environ.get("DRONE_IP", "10.202.0.1")

def connect_drone():
    drone = olympe.Drone(DRONE_IP)
    drone.connect()
    return drone

def takeoff(drone):
    assert drone(
        TakeOff()
        >> FlyingStateChanged(state="hovering", _timeout=10)
    ).wait().success()

def landing(drone):
    assert drone(Landing()).wait().success()
    drone.disconnect()

if __name__ == "__main__":
    drone = connect_drone()
    takeoff()
    landing()