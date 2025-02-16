from sqlalchemy import Column, Integer, String, Float
from database.database import Base  # ✅ Import `Base`



class Listing(Base):
    __tablename__ = "listings"
    __table_args__ = {"schema": "public"}  # Explicitly define the schema

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    price = Column(Float, index=True)
    location = Column(String, index=True)
    image_url = Column(String)
    contact_info = Column(String)
    listing_url = Column(String)
