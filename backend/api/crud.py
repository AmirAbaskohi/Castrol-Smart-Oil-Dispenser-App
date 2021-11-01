import sys
from datetime import datetime

from database import schemas
from database.database import SessionLocal, engine
from fastapi import Depends, FastAPI, HTTPException, Request, Response, status
from sqlalchemy.orm import Session, load_only
from sqlalchemy.sql.expression import and_, select
from sqlalchemy.sql.functions import mode
from services import minPacks as packs_service

from . import models

sys.path.append("..")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db = Session = Depends(get_db)


def create_dispense(db: Session, dispense: schemas.DispenseCreate):
    db_data = dispense
    db.add(db_data)
    db.commit()
    db.refresh(db_data)
    return db_data


def get_dispense(user_id, db: Session):
    results = (
        db.query(
            models.Barrel.oil_type,
            models.Dispense.dispensed_quantity,
            models.Dispense.car_registration_number,
            models.Dispense.created_at,
            models.Dispense.id,
        )
        .join(
            models.Dispense, models.Dispense.barrels_id == models.Barrel.barrel_type_id
        )
        .filter(models.Dispense.user_id == user_id)
        .all()
    )
    return results


def get_order_transactions(user_id, db: Session):
    results = (
        db.query(
            models.Order.id,
            models.Order.created_at,
            models.Order.oil_type,
            models.Barrel_Type.total_volume,
        )
        .join(models.Barrel_Type, models.Barrel_Type.id == models.Order.barrel_type_id)
        .filter(models.Order.user_id == user_id)
        .all()
    )
    return results


def get_environmental_benefits(user_id, db: Session):
    results = (
        db.query(
            models.Dispense.id,
            models.Dispense.created_at,
            models.Dispense.dispensed_quantity,
            models.Dispense.dispensed_quantity * 5 / 100,
            models.Dispense.dispensed_quantity * 5 * 6 / 100,
        )
        .filter(models.Dispense.user_id == user_id)
        .all()
    )
    return results


async def get_cloud_dispense_data(dispense_id, db: Session):
    results = (
        db.query(
            models.Dispense.id,
            models.Dispense.created_at,
            models.Dispense.car_registration_number,
            models.Dispense.car_manufacturer,
            models.Dispense.car_model,
            models.Dispense.car_engine_type,
            models.Dispense.dispensed_quantity,
            models.Dispense.suggested_quantity,
            models.Dispense.dispense_type,
            models.User.name,
            models.Barrel.oil_type,
        )
        .join(models.Barrel, models.Dispense.barrels_id == models.Barrel.id)
        .join(models.User, models.Dispense.user_id == models.User.id)
        .filter(models.Dispense.id == dispense_id)
        .all()
    )
    return results


def get_barrel(db: Session):
    results = (
        db.query(
            models.Barrel.id,
            models.Barrel.oil_type,
            models.Barrel.remaining_quantity,
            models.Barrel.created_at,
            models.Barrel.barrel_type_id,
            models.Barrel_Type.total_volume,
        )
        .join(models.Barrel_Type, models.Barrel_Type.id == models.Barrel.barrel_type_id)
        .all()
    )
    return results


def update_barrels(id: int, dispensed_quantity: int, db: Session):
    db_barrel = (
        db.query(models.Barrel)
        .filter(models.Barrel.barrel_type_id == id)
        .update(
            {
                models.Barrel.remaining_quantity: models.Barrel.remaining_quantity
                - dispensed_quantity
            }
        )
    )
    db.commit()
    return db_barrel


def get_remaining_quantity(id: int, db: Session):
    results = (
        (
            db.query(
                models.Barrel.oil_type,
                models.Barrel.remaining_quantity,
                100
                - (
                    (models.Barrel_Type.total_volume - models.Barrel.remaining_quantity)
                    / models.Barrel_Type.total_volume
                    * 100
                ),
            )
        )
        .join(models.Barrel_Type, models.Barrel_Type.id == models.Barrel.barrel_type_id)
        .filter(models.Barrel.barrel_type_id == id)
        .all()
    )
    return results


def get_barrel_types(db: Session):
    return db.query(models.Barrel_Type).all()


def get_barrel_records(db: Session):
    results = db.query(models.Barrel.id, models.Barrel.oil_type).all()
    return results


def create_order(db: Session, order: schemas.OrderCreate):
    db_order = models.Order(
        barrel_type_id=order.barrel_type_id,
        oil_type=order.oil_type,
        user_id=order.user_id,
        created_at=datetime.utcnow(),
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order


async def get_cloud_order_data(order_id, db: Session):
    results = (
        db.query(
            models.Order.id,
            models.Order.created_at,
            models.Barrel_Type.total_volume,
            models.Order.oil_type,
            models.User.name,
        )
        .join(models.Barrel_Type, models.Order.barrel_type_id == models.Barrel_Type.id)
        .join(models.User, models.Order.user_id == models.User.id)
        .filter(models.Order.id == order_id)
        .first()
    )

    return results


def get_order_records(db: Session):
    results = (
        (
            db.query(
                models.Order.id,
                models.Order.created_at,
                models.Barrel_Type.total_volume,
                models.Order.oil_type,
                models.User.name,
            )
        )
        .join(models.Barrel_Type, models.Order.barrel_type_id == models.Barrel_Type.id)
        .join(models.User, models.Order.user_id == models.User.id)
        .all()
    )
    return results


def get_user_by_rfid_tag(rfid_tag, db: Session):
    return (
        db.query(models.User.id, models.User.name)
        .filter(models.User.rfid_tag == rfid_tag)
        .first()
    )


def update_barrels_by_id(id: int, db: Session):
    result = (
        (
            db.query(
                models.Barrel.barrel_type_id,
                models.Barrel_Type.total_volume,
                models.Barrel.oil_type,
                models.Barrel.id,
                models.Barrel.remaining_quantity,
            )
        )
        .join(models.Barrel_Type, models.Barrel_Type.id == models.Barrel.barrel_type_id)
        .filter(models.Barrel.id == id)
        .first()
    )

    db_barrel = (
        db.query(models.Barrel)
        .filter(models.Barrel.id == id)
        .update(
            {models.Barrel.remaining_quantity: result[1]},
            synchronize_session=False,
        )
    )

    db.commit()
    return db.query(models.Barrel).filter(models.Barrel.id == id).first()


def get_user_by_name(name, db: Session):
    return (
        db.query(models.User.id, models.User.name, models.User.rfid_tag)
        .filter(models.User.name == name)
        .first()
    )
