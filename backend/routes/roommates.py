from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from models.roommates import Roommate
from database.database import get_db
from pydantic import BaseModel
from typing import List, Optional

router = APIRouter()

@router.post("/roommates/mock")
def add_mock_roommates(db: Session = Depends(get_db)):
    mock_roommates = mock_roommates = [
        {
            "user_id": 1,
            "name": "Alice Johnson",
            "budget": 850.0,
            "cleanliness": "Very Clean",
            "sleep_schedule": "Early Bird",
            "study_habits": "Quiet",
            "social_level": "Introvert",
            "pet_friendly": "Yes",
            "points": 95,
            "contact": "alice@example.com"
        },
        {
            "user_id": 2,
            "name": "Bob Smith",
            "budget": 950.0,
            "cleanliness": "Moderate",
            "sleep_schedule": "Night Owl",
            "study_habits": "Moderate",
            "social_level": "Extrovert",
            "pet_friendly": "No",
            "points": 88,
            "contact": "bob@example.com"
        },
        {
            "user_id": 3,
            "name": "Charlie Brown",
            "budget": 700.0,
            "cleanliness": "Messy",
            "sleep_schedule": "Flexible",
            "study_habits": "Noisy",
            "social_level": "Moderate",
            "pet_friendly": "Yes",
            "points": 75,
            "contact": "charlie@example.com"
        },
        {
            "user_id": 4,
            "name": "Diana Prince",
            "budget": 1200.0,
            "cleanliness": "Very Clean",
            "sleep_schedule": "Early Bird",
            "study_habits": "Quiet",
            "social_level": "Extrovert",
            "pet_friendly": "No",
            "points": 98,
            "contact": "diana@example.com"
        },
        {
            "user_id": 5,
            "name": "Ethan Hunt",
            "budget": 800.0,
            "cleanliness": "Moderate",
            "sleep_schedule": "Night Owl",
            "study_habits": "Moderate",
            "social_level": "Introvert",
            "pet_friendly": "No",
            "points": 85,
            "contact": "ethan@example.com"
        },
        {
            "user_id": 6,
            "name": "Fiona Gallagher",
            "budget": 950.0,
            "cleanliness": "Messy",
            "sleep_schedule": "Flexible",
            "study_habits": "Noisy",
            "social_level": "Extrovert",
            "pet_friendly": "Yes",
            "points": 72,
            "contact": "fiona@example.com"
        },
        {
            "user_id": 7,
            "name": "George Wilson",
            "budget": 1000.0,
            "cleanliness": "Very Clean",
            "sleep_schedule": "Early Bird",
            "study_habits": "Quiet",
            "social_level": "Moderate",
            "pet_friendly": "No",
            "points": 91,
            "contact": "george@example.com"
        },
        {
            "user_id": 8,
            "name": "Hannah Baker",
            "budget": 875.0,
            "cleanliness": "Moderate",
            "sleep_schedule": "Night Owl",
            "study_habits": "Quiet",
            "social_level": "Introvert",
            "pet_friendly": "Yes",
            "points": 86,
            "contact": "hannah@example.com"
        },
        {
            "user_id": 9,
            "name": "Ian Wright",
            "budget": 1100.0,
            "cleanliness": "Very Clean",
            "sleep_schedule": "Flexible",
            "study_habits": "Moderate",
            "social_level": "Extrovert",
            "pet_friendly": "No",
            "points": 94,
            "contact": "ian@example.com"
        },
        {
            "user_id": 10,
            "name": "Jessica Miller",
            "budget": 800.0,
            "cleanliness": "Messy",
            "sleep_schedule": "Early Bird",
            "study_habits": "Noisy",
            "social_level": "Moderate",
            "pet_friendly": "Yes",
            "points": 70,
            "contact": "jessica@example.com"
        }
    ]


    for roommate in mock_roommates:
        # Check if user already exists
        existing_roommate = db.query(Roommate).filter(Roommate.user_id == roommate["user_id"]).first()
        if not existing_roommate:
            db.add(Roommate(**roommate))

    db.commit()
    return {"message": "Mock roommate data added successfully"}


# Define the input model for roommate matching
class RoommatePreference(BaseModel):
    budget: Optional[float] = None
    cleanliness: Optional[str] = None
    sleep_schedule: Optional[str] = None
    study_habits: Optional[str] = None
    social_level: Optional[str] = None
    pet_friendly: Optional[str] = None

@router.post("/roommates/match")
def match_roommates(preferences: RoommatePreference, db: Session = Depends(get_db)):
    query = db.query(Roommate)

    # Apply filters based on user preferences
    if preferences.budget:
        query = query.filter(Roommate.budget <= preferences.budget)
    if preferences.cleanliness:
        query = query.filter(Roommate.cleanliness == preferences.cleanliness)
    if preferences.sleep_schedule:
        query = query.filter(Roommate.sleep_schedule == preferences.sleep_schedule)
    if preferences.study_habits:
        query = query.filter(Roommate.study_habits == preferences.study_habits)
    if preferences.social_level:
        query = query.filter(Roommate.social_level == preferences.social_level)
    if preferences.pet_friendly:
        query = query.filter(Roommate.pet_friendly == preferences.pet_friendly)

    # Get top 3 matches
    matches = query.limit(3).all()

    return {"matches": matches}