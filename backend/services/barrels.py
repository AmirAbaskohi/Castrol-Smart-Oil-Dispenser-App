from api import models
from sqlalchemy.orm import Session, load_only


def get_barrel_id(oiltype: str, db: Session):
    data = (
        db.query(models.Barrel.barrel_type_id)
        .filter(models.Barrel.oil_type == oiltype)
        .all()
    )
    for d in data:
        pass
    return d[0]
