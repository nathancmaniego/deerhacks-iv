from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from models.listing import Listing
from database.database import get_db
from kijijiscraper import scrape_kijiji_rentals

router = APIRouter()

# Store scraped listings
@router.post("/scrape")
def update_listings(db: Session = Depends(get_db)):
    scraped_listings = scrape_kijiji_rentals()

    if not scraped_listings:
        return {"message": "No new listings found"}

    for listing in scraped_listings:
        db.add(Listing(**listing))

    db.commit()
    return {"message": f"{len(scraped_listings)} listings added"}
