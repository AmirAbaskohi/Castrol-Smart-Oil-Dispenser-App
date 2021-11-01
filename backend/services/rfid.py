
import threading
import server
from api import crud
import sys
import helper
import time


def start_rfid_reader():
    print("Starting RFID Reader...")
    x = threading.Thread(target=read_rfid_forever, daemon=True)
    x.start()
    print("Started RFID Reader.")


def read_rfid_forever():
    print("Starting read_rfid_forever...")
    try:
        if helper.running_on_raspberrypi():
            from mfrc522 import SimpleMFRC522
            reader = SimpleMFRC522()
        else:
            reader = None
    except:
            print("'read_rfid_forever' error when initiating RFID reader: ", sys.exc_info()[0])
            reader = None
  
    while True:
        ## loop forever
        try:
            # Do we even have an RFID reader?
            if reader is None:
                # Fake it Option  - Sleep a while, then pretend somone just scanned RFID - repeatedly....
                #time.sleep(15)
                #id="225534814579"

                # Don't Fake it:  No RFID reader so just exit this whole RFID reader code, because it is never going to work 
                return
            else:    
                id, text = reader.read()
           
            print(f"Read RFID Token:[{id}]")
            server.notify_client(id, next(crud.get_db()))
        except:
            print(f"[ERROR]: ", sys.exc_info()[0])



