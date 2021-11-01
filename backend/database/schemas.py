from typing import List, Optional

from pydantic import BaseModel


# **********************************************************************************************************************
class UserBase(BaseModel):
    name: str
    rfid_tag: str


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int

    class Config:
        orm_mode = True


# **********************************************************************************************************************
class BarrelBase(BaseModel):
    oil_type: str
    remaining_quantity: int
    barrel_type_id: int


class BarrelCreate(BarrelBase):
    pass


class Barrel(BarrelBase):
    id: int

    class Config:
        orm_mode = True


# **********************************************************************************************************************
class BarrelTypeBase(BaseModel):
    id: int
    total_volume: int


class BarrelTypeCreate(BarrelTypeBase):
    pass


class BarrelType(BarrelTypeBase):
    class Config:
        orm_mode = True


# **********************************************************************************************************************
class OrderBase(BaseModel):
    barrel_type_id: int
    oil_type: str
    user_id: int


class OrderCreate(OrderBase):
    pass


class Order(OrderBase):
    id: int

    class Config:
        orm_mode = True


# **********************************************************************************************************************
class DispenseBase(BaseModel):
    car_registration_number: str
    car_manufacturer: str
    car_model: str
    car_engine_type: str
    suggested_quantity: float
    dispensed_quantity: float
    barrels_id: int
    dispense_type: str
    user_id: int


class DispenseCreate(DispenseBase):
    pass


class Dispense(DispenseBase):
    id: int

    class Config:
        orm_mode = True
