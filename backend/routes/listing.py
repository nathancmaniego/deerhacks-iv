from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import or_
from models.listing import Listing
from database.database import get_db
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

# Get all listings
@router.get("/listings")
def get_listings(db: Session = Depends(get_db)):
    return db.query(Listing).all()

@router.get("/listings")
def get_listings(db: Session = Depends(get_db)):
    return db.query(Listing).all()

class ListingFilter(BaseModel):
    location: Optional[str] = None # 0 - infty
    price: Optional[float] = None # "Very Clean", "Moderate", "Messy"

@router.post("/listings/filter")
def filter_listings(preferences: ListingFilter, db: Session = Depends(get_db)):
    query = db.query(Listing)

    if preferences.location:
        city = preferences.location
        filters = [Listing.location.ilike(f"%{city}%")]
        query = query.filter(or_(*filters))

    if preferences.price:
        query = query.filter(Listing.price <= preferences.price)
    
    return {"filter": query.all()}