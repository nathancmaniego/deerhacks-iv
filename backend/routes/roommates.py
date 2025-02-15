from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from models.roommates import Roommate
from database.database import get_db

router = APIRouter()

# Add mock roommate data
@router.post("/roommates/mock")
def add_mock_data(db: Session = Depends(get_db)):
    mock_roommates = [
        {"user_id": 7, "name": "Mark", "budget": 850, "cleanliness": "Moderate", "sleep_schedule": "Early Bird", "study_habits": "Quiet", "social_level": "Extrovert", "pet_friendly": "No", "points": 100},
        {"user_id": 8, "name": "Nate", "budget": 1000, "cleanliness": "Very Clean", "sleep_schedule": "Night Owl", "study_habits": "Moderate", "social_level": "Introvert", "pet_friendly": "Yes", "points": 100},
        {"user_id": 9, "name": "Ethan", "budget": 750, "cleanliness": "Messy", "sleep_schedule": "Flexible", "study_habits": "Noisy", "social_level": "Moderate", "pet_friendly": "No", "points": 100},
    ]

    for roommate in mock_roommates:
        db.add(Roommate(**roommate))

    db.commit()
    return {"message": "Mock roommate data added"}
