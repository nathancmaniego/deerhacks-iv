from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Roommate(Base):
    __tablename__ = "roommates"
    __table_args__ = {"schema": "public"}  # Explicitly define the schema
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, unique=True, index=True)
    name = Column(String, index=True)
    budget = Column(Float, index=True)
    cleanliness = Column(String, index=True)
    sleep_schedule = Column(String, index=True)
    study_habits = Column(String, index=True)
    social_level = Column(String, index=True)
    pet_friendly = Column(String, index=True)
    points = Column(Integer, index=True)
    contact = Column(String, index=True)
