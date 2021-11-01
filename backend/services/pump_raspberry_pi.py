from datetime import datetime

import RPi.GPIO as GPIO

in1 = 6
in2 = 5
in3 = 22
in4 = 27
en1 = 26
en2 = 4

GPIO.setmode(GPIO.BCM)
GPIO.setup(in1, GPIO.OUT)
GPIO.setup(in2, GPIO.OUT)
GPIO.setup(in3, GPIO.OUT)
GPIO.setup(in4, GPIO.OUT)
GPIO.setup(en1, GPIO.OUT)
GPIO.setup(en2, GPIO.OUT)

GPIO.output(in1, GPIO.LOW)
GPIO.output(in2, GPIO.LOW)
GPIO.output(in3, GPIO.LOW)
GPIO.output(in4, GPIO.LOW)
p1 = GPIO.PWM(en1, 1000)
p2 = GPIO.PWM(en2, 1000)
p1.start(100)
p2.start(100)


def control_pump(action_type, pump_id):
    try:
        print(
            f"[{datetime.utcnow()}] Sending '{action_type}' command to Pump {pump_id}."
        )

        if pump_id == 1:
            if action_type == "start":
                print("start the pump")
                GPIO.output(in1, GPIO.HIGH)
                GPIO.output(in2, GPIO.LOW)
            if action_type == "stop":
                print("stop the pump")
                GPIO.output(in1, GPIO.LOW)
                GPIO.output(in2, GPIO.LOW)
        else:
            if action_type == "start":
                print("start the pump")
                GPIO.output(in4, GPIO.HIGH)
                GPIO.output(in3, GPIO.LOW)
            if action_type == "stop":
                print("stop the pump")
                GPIO.output(in3, GPIO.LOW)
                GPIO.output(in4, GPIO.LOW)

    except ImportError as e:
        print(f"[ERROR]: {e}")


def cleanup():
    print(f"[{datetime.utcnow()}] GPIO cleanup.")
    GPIO.cleanup()
