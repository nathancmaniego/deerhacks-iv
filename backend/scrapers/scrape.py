from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from models.listing import Listing
from database.database import get_db
from .kijiji_scraper import scrape_kijiji_rentals
from .facebook_scraper import scrape_facebook_rentals
from typing import Optional

router = APIRouter()

# Store scraped listings
@router.post("/scrape")
def update_listings(
    city: str = Query(..., description="City to search in"),
    max_price: Optional[float] = Query(None, description="Maximum price filter"),
    db: Session = Depends(get_db)
):
    # Scrape from both sources
    kijiji_listings = scrape_kijiji_rentals(city, max_price)
    facebook_listings = scrape_facebook_rentals(city, max_price)
    
    # Combine listings from both sources
    all_listings = kijiji_listings + facebook_listings

    if not all_listings:
        return {"message": "No new listings found"}

    for listing in all_listings:
        db.add(Listing(**listing))

    db.commit()
    return {"message": f"{len(all_listings)} listings added"}
