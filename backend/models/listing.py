from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Listing(Base):
    __tablename__ = "listings"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    price = Column(Float, index=True)
    location = Column(String, index=True)
    image_url = Column(String)
    contact_info = Column(String)
    listing_url = Column(String)
