from datetime import datetime

from database.database import Base
from sqlalchemy import Boolean, Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import Float


class User(Base):
    __tablename__ = "Users"

    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow())
    name = Column(String)
    password = Column(String)
    rfid_tag = Column(String)

    Dispenses = relationship("Dispense", back_populates="users")
    Orders = relationship("Order", back_populates="users")


class Order(Base):
    __tablename__ = "Orders"

    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow())
    barrel_type_id = Column(Integer, ForeignKey("Barrel_Types.id"))
    oil_type = Column(Integer)
    user_id = Column(Integer, ForeignKey("Users.id"), nullable=True)

    barrel_types = relationship("Barrel_Type", back_populates="Orders")
    users = relationship("User", back_populates="Orders")


class Barrel_Type(Base):

    __tablename__ = "Barrel_Types"

    id = Column(Integer, primary_key=True)
    created_at = Column(String, default=datetime.utcnow().date())
    total_volume = Column(Integer)
    Orders = relationship("Order", back_populates="barrel_types")
    Barrels = relationship("Barrel", back_populates="Barrel_Types")


class Barrel(Base):
    __tablename__ = "Barrels"

    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(String, default=datetime.utcnow().date())
    barrel_type_id = Column(Integer, ForeignKey("Barrel_Types.id"))
    oil_type = Column(String)
    remaining_quantity = Column(Float)

    Dispenses = relationship("Dispense", back_populates="barrels")
    Barrel_Types = relationship("Barrel_Type", back_populates="Barrels")


class Dispense(Base):
    __tablename__ = "Dispenses"

    id = Column(Integer, primary_key=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow())
    car_registration_number = Column(String, nullable=True)
    car_manufacturer = Column(String, nullable=True)
    car_model = Column(String, nullable=True)
    car_engine_type = Column(String, nullable=True)
    suggested_quantity = Column(Float, nullable=True)
    dispensed_quantity = Column(Float)
    barrels_id = Column(Integer, ForeignKey("Barrels.id"))
    dispense_type = Column(String)
    user_id = Column(Integer, ForeignKey("Users.id"))
    users = relationship("User", back_populates="Dispenses")
    barrels = relationship("Barrel", back_populates="Dispenses")
