from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from models.listing import Listing
from database.database import get_db

router = APIRouter()

# Get all listings
@router.get("/listings")
def get_listings(db: Session = Depends(get_db)):
    return db.query(Listing).all()
