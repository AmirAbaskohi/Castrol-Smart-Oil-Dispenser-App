import asyncio
import atexit
import json
import random
import re
import secrets
import time
from datetime import datetime
from typing import List

import nest_asyncio
import uvicorn
import websockets
from azure.iot.device.aio import IoTHubDeviceClient
from fastapi import (
    Depends,
    FastAPI,
    HTTPException,
    Request,
    Response,
    WebSocket,
    status,
)
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from sqlalchemy.orm import Session
from sqlalchemy.sql.functions import user

from api import crud, models
from database import schemas
from database.database import SessionLocal, engine
from helper import get_dispense_duration, get_pump_id, running_on_raspberrypi
from services import barrels as barrels_service
from services import iotdevices
from services import pump as pump_service
from services import rfid, senddispenserinfo

nest_asyncio.apply()


# async def handler(websocket, path):
#     while True:
#         id = random.randint(1, 2)
#         name = "John Doe" if id == 1 else "Fred"
#         data = [{"id": id, "name": name}]
#         await asyncio.sleep(30)
#         await websocket.send(json.dumps(data))


# start_server = websockets.serve(handler, "127.0.0.1", 8888)
# asyncio.get_event_loop().run_until_complete(start_server)


models.Base.metadata.create_all(bind=engine)
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def cleanup():
    print(f"[{datetime.utcnow()}] Process exit.")
    if running_on_raspberrypi():
        pump_service.cleanup()


atexit.register(cleanup)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/userInfo/", response_model=schemas.User, tags=["user"])
async def get_user(request: Request, db: Session = Depends(get_db)):
    body = await request.json()
    db_user = crud.get_user_by_name(body["name"], db=db)

    if db_user == None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found."
        )
    return db_user


@app.post("/dispenses/", tags=["dispense"])
async def create_dispense(request: Request, db: Session = Depends(get_db)):
    body = await request.json()
    print(f"[{datetime.utcnow()}] Start dispensing oil: ", body)

    carManufacturer = (
        body["carManufacturer"] if body["carManufacturer"] != "None" else ""
    )
    carModel = body["carModel"] if body["carModel"] != "None" else ""
    carEngineType = body["carEngineType"] if body["carEngineType"] != "None" else ""

    if running_on_raspberrypi():
        pump_id = get_pump_id(body["oilType"])
        dispense_duration = get_dispense_duration(body["dispensedQuantity"])
        pump_service.control_pump("start", pump_id)
        time.sleep(dispense_duration)
        pump_service.control_pump("stop", pump_id)

    dispense = models.Dispense(
        car_registration_number=body["registrationNumber"],
        car_manufacturer=carManufacturer,
        car_model=carModel,
        car_engine_type=carEngineType,
        suggested_quantity=body["suggestedQuantity"],
        dispensed_quantity=body["dispensedQuantity"],
        dispense_type=body["dispenseType"],
        user_id=body["userId"],
        created_at=datetime.utcnow(),
        barrels_id=barrels_service.get_barrel_id(body["oilType"], db=db),
    )

    db_dispense = crud.create_dispense(db=db, dispense=dispense)
    print("dispense results", db_dispense.id)

    crud.update_barrels(
        id=barrels_service.get_barrel_id(body["oilType"], db=db),
        dispensed_quantity=body["dispensedQuantity"],
        db=db,
    )
    print(
        f"barrels table updated for id: {barrels_service.get_barrel_id(body['oilType'],db=db)}"
    )

    get_remaining_quantity = crud.get_remaining_quantity(
        id=barrels_service.get_barrel_id(body["oilType"], db=db), db=db
    )

    data = {}
    for results in get_remaining_quantity:
        data = {
            "data": {
                "oil_type": results[0],
                "remaining_quantity": results[1],
                "remaining_quantity_perc": round(results[2], 2),
                "remainingInBarrel": "73.22 L (35.85%)",
            }
        }

    cloud_results = await crud.get_cloud_dispense_data(db_dispense.id, db=db)
    print("cloud results", cloud_results)

    send_info_to_azure = senddispenserinfo.SendDispensingIinfo(
        iotdevices.iot_devices["rd01"]
    )

    if cloud_results == None:
        print("nothing returned")
        pass
    else:
        await send_info_to_azure.send_dispense_info(
            cloud_results[0][0],
            cloud_results[0][1].strftime("%Y-%m-%d, %H:%M:%S"),
            cloud_results[0][2],
            cloud_results[0][3],
            cloud_results[0][4],
            cloud_results[0][5],
            cloud_results[0][7],
            cloud_results[0][6],
            cloud_results[0][8],
            cloud_results[0][9],
            cloud_results[0][10],
            data["data"]["remaining_quantity"],
            data["data"]["remaining_quantity_perc"],
        )

    return data


@app.get("/dispenses/{user_id}", tags=["dispense"])
def get_dispense(user_id: int, db: Session = Depends(get_db)):
    get_transaction = crud.get_dispense(user_id=int(user_id), db=db)
    return get_transaction


@app.get("/barrel/", tags=["barrel"])
def get_barrel(db: Session = Depends(get_db)):
    db_barrel = crud.get_barrel(db)
    return db_barrel


@app.put("/barrel/{id}", tags=["barrel"])
def get_barrel(id: int, db: Session = Depends(get_db)):
    db_barrel = crud.update_barrels_by_id(id=id, db=db)
    return db_barrel


@app.get("/barreltypes/", response_model=List[schemas.BarrelType], tags=["barreltype"])
def get_barrel_types(db: Session = Depends(get_db)):
    db_barrel_types = crud.get_barrel_types(db)
    return db_barrel_types


@app.post("/order/", response_model=schemas.Order, tags=["order"])
async def create_order(order: schemas.OrderCreate, db: Session = Depends(get_db)):
    crud.create_order(db=db, order=order)
    data = """{success}"""
    return Response(content=data, media_type="application/xml")


@app.get("/order/", tags=["order"])
def get_order(db: Session = Depends(get_db)):
    db_orders = crud.get_order_records(db=db)
    return db_orders


@app.get("/orders/{user_id}", tags=["order"])
def get_order_transactions(user_id: int, db: Session = Depends(get_db)):
    get_transactions = crud.get_order_transactions(user_id=int(user_id), db=db)
    return get_transactions


@app.get("/environmental-benefits/{user_id}", tags=["order"])
def get_environmental_benefits(user_id: int, db: Session = Depends(get_db)):
    transactions = crud.get_environmental_benefits(user_id=int(user_id), db=db)

    result = []

    for t in transactions:
        enhanced_item = {
            "id": t[0],
            "created_at": t[1],
            "dispensed_quantity": t[2],
            "saved_plastic": t[3],
            "saved_co2": t[4],
            "packs": 1 if t[2] < 3 else 2,
        }
        result.append(enhanced_item)

    return result


@app.get("/oilTypes/reg/", tags=["external db"])
async def get_oil_types_by_reg_number(vehicle_reg: str, db: Session = Depends(get_db)):
    print(f"[{datetime.utcnow()}] Received registration number: {vehicle_reg}.")

    MIN_NUMBER_LENGTH = 6

    if len(vehicle_reg) < MIN_NUMBER_LENGTH:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Car Registration Number not found.",
        )
    else:
        return {
            "recommendedQuantity": "4.5",
            "details": "Volkswagen (VW) (EU) Passat B7, 3C/36 (2010-2015)",
            "types": crud.get_barrel_records(db),
        }


@app.get("/oilTypes/", tags=["external db"])
def get_oil_types(db: Session = Depends(get_db)):
    print(f"[{datetime.utcnow()}] Received request to get the oil types.")
    db_barrel_records = crud.get_barrel_records(db)
    return db_barrel_records


@app.post("/api/pump/procedure", tags=["pump"])
async def pump_start(request: Request):
    body = await request.json()
    print(f"[{datetime.utcnow()}] Received command for Pump {body['pumpId']}.", body)

    if running_on_raspberrypi():
        pump_service.control_pump(body["action"], body["pumpId"])

    return


##RFID Login Handling - Begin

# Start the RFID reader to keep reading forever
rfid.start_rfid_reader()

# set up the rfid_read_event to notify when a value has been read from the RFID
global rfid_read_event
rfid_read_event = asyncio.Event()

# Create and start the Websocket for RFID login information to be sent to client
@app.websocket("/rfid_login")
async def rfid_login_handler(websocket: WebSocket):
    global rfid_user
    await websocket.accept()
    while True:
        await rfid_read_event.wait()
        if rfid_user is not None:
            user_json = json.dumps(
                {"id": rfid_user["id"], "name": f"{rfid_user['name']}"}
            )
            print(f"Notifying client of RFID User for {user_json}")
            await websocket.send_text(user_json)
            rfid_user = None
        rfid_read_event.clear()


# Given an RFID token id, looks up user in database and sends notification to front end that user wants to log in
def notify_client(rfid_token_id, db):
    global rfid_user
    rfid_user = crud.get_user_by_rfid_tag(rfid_token_id, db)
    print(f"Found User for rfid_token_id {rfid_token_id}: {rfid_user}")
    rfid_read_event.set()


##RFID Login Handling - End
