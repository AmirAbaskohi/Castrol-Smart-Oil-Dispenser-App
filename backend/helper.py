import os
from datetime import datetime


def running_on_raspberrypi():
    try:
        if (os.uname()[4]).startswith("arm"):
            return True
        else:
            return False
    except AttributeError:
        return False


def get_pump_id(oil_type):
    if oil_type == "EDGE 5W-40":
        return 1
    else:
        return 2


def get_dispense_duration(oil_quantity):
    quantity = float(oil_quantity)
    max_quantity_to_dispense = 0.2 if quantity >= 0.2 else quantity
    duration = max_quantity_to_dispense * 60 / 0.45
    print(f"[{datetime.utcnow()}] get_dispense_duration for {oil_quantity}: ", duration)
    return duration
