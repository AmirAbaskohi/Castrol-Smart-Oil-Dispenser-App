from datetime import datetime


def control_pump(action_type, pump_id):
    print(f"[{datetime.utcnow()}] Sending '{action_type}' command to Pump {pump_id}.")


def cleanup():
    print(f"[{datetime.utcnow()}] GPIO cleanup.")
