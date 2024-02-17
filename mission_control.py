import olympe
from olympe.messages.mission import activate

def create_and_connect_drone(ip_address):
    drone = olympe.Drone(ip_address)
    drone.connect()
    return drone

def upload_mission(drone, mission_uid):
    assert drone(
        olympe.messages.mission.load(mission_uid, _timeout=10, _no_expect=False, _float_tol=(1e-07, 1e-09))
    ).wait().success()
    drone.disconnect()

def upload_missions(drone, mission_uids):
    for mission_uid in mission_uids:
        upload_mission(drone, mission_uid)

def start_mission_by_uid(drone, mission_uid):
    start_mission(drone, mission_uid)

def start_mission(drone, mission_uid):
    assert drone(
        activate(mission_uid, _timeout=10, _no_expect=False, _float_tol=(1e-07, 1e-09))
    ).wait().success()
    drone.disconnect()

if __name__ == "__main__":
    DRONE_IP = os.environ.get("DRONE_IP", "10.202.0.1")
    drone = create_and_connect_drone(DRONE_IP)
    mission_uids = ["mission_uid1", 
                    "mission_uid2",
                    "mission_uid3"] # Get these from our AirSDK
    upload_missions(drone, mission_uids)
    
    # Ex. Start a mission by its UID
    start_mission_by_uid(drone, "mission_uid1")
