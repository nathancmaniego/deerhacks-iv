from fastapi import FastAPI, Depends
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from pydantic import BaseModel
import os
import requests
from bs4 import BeautifulSoup
from dotenv import load_dotenv
from kijijiscraper import scrape_kijiji_rentals

# Load environment variables
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://deerhacks_iv_user:5JWmSMiybABwDTwQ9AzX13FTNUwSmBR2@dpg-cuo9bsd2ng1s73e5g9n0-a/deerhacks_iv")

# Database Setup
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Define Listing Model
class Listing(Base):
    __tablename__ = "listings"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    price = Column(Float, index=True)
    location = Column(String, index=True)
    image_url = Column(String)
    contact_info = Column(String)
    listing_url = Column(String)

Base.metadata.create_all(bind=engine)

# Pydantic Model for API Requests
class ListingCreate(BaseModel):
    title: str
    price: float
    location: str
    image_url: str
    contact_info: str
    listing_url: str

# Initialize FastAPI App
app = FastAPI() 

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Web Scraper Function
def scrape_kijiji_rentals(city="toronto"):
    return scrape_kijiji_rentals()
    


# Store Scraped Listings in Database
@app.post("/api/scrape")
def update_listings(db: Session = Depends(get_db)):
    scraped_listings = scrape_kijiji_rentals()

    if not scraped_listings:
        return {"message": "No new listings found"}

    for listing in scraped_listings:
        new_listing = Listing(**listing)
        db.add(new_listing)

    db.commit()
    return {"message": f"{len(scraped_listings)} listings added"}

# API Route: Get All Listings
@app.get("/api/listings")
def get_listings(db: Session = Depends(get_db)):
    return db.query(Listing).all()
