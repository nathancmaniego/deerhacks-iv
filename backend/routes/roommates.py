from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from models.roommates import Roommate
from database.database import get_db
from pydantic import BaseModel
from typing import List, Optional
import random

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
    budget: Optional[float] = None # 0 - infty
    cleanliness: Optional[str] = None # "Very Clean", "Moderate", "Messy"
    sleep_schedule: Optional[str] = None # "Early Bird", "Night Owl", "Flexible"
    study_habits: Optional[str] = None # "Quiet", "Moderate", "Noisy"
    social_level: Optional[str] = None  # "Introvert", "Extrovert", "Moderate"
    pet_friendly: Optional[str] = None # "Yes", "No"

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
    matches = query.all()

    return {"matches": matches}

@router.get("/roommates")
def get_listings(db: Session = Depends(get_db)):
    return db.query(Roommate).all()

@router.post("/roommates/mock/200")
def add_mock_roommates(db: Session = Depends(get_db)):
    max_user_id = db.query(Roommate.user_id).order_by(Roommate.user_id.desc()).first()

    # If the database is empty, start from 1, otherwise start from max_user_id + 1
    start_user_id = max_user_id[0] + 1 if max_user_id else 1

    # Lists of possible values for each attribute
    names = ["Alice Johnson", "Bob Smith", "Charlie Brown", "Diana Prince", "Ethan Hunt",
            "Fiona Carter", "George Wilson", "Hannah Baker", "Ian Wright", "Julia Roberts",
            "Kevin Hart", "Liam Anderson", "Mia Clark", "Noah Thompson", "Olivia White",
            "Paul Adams", "Quinn Johnson", "Ryan Lewis", "Sophia Martinez", "Tom Hardy",
            "Uma Thurman", "Vin Diesel", "Will Smith", "Xavier Brown", "Yara Shahidi",
            "LeBron James", "Kendrick Lamar", "Zendaya Coleman", "Michael Jordan", "Serena Williams",
            "Kobe Bryant", "Beyonce Knowles", "Rihanna Fenty", "Jay-Z Carter", "Drake Graham",
            "Kanye West", "Kim Kardashian", "Kylie Jenner", "Kendall Jenner", "Travis Scott",
            "Kourtney Kardashian", "Khloe Kardashian", "Kris Jenner", "Caitlyn Jenner", "Stormi Webster"
            ]  # Add more names

    cleanliness_levels = ["Very Clean", "Moderate", "Messy"]
    sleep_schedules = ["Early Bird", "Night Owl", "Flexible"]
    study_habits = ["Quiet", "Moderate", "Noisy"]
    social_levels = ["Introvert", "Moderate", "Extrovert"]
    pet_friendly_options = ["Yes", "No"]


    mock_roommates = []
    for i in range(200):
        roommate = {
            "user_id": start_user_id + i,  # Assign a unique user ID
            "name": random.choice(names) + f" {i+1}",  # Ensure name uniqueness
            "budget": round(random.uniform(500, 2000), 2),  # Random budget between $500 and $2000
            "cleanliness": random.choice(cleanliness_levels),
            "sleep_schedule": random.choice(sleep_schedules),
            "study_habits": random.choice(study_habits),
            "social_level": random.choice(social_levels),
            "pet_friendly": random.choice(pet_friendly_options),
            "points": random.randint(50, 100),  # Random points between 50 and 100
            "contact": f"user{start_user_id + i}@example.com"  # Unique email
        }
        mock_roommates.append(roommate)

    # Generate unique user IDs

    for roommate in mock_roommates:
        existing_roommate = db.query(Roommate).filter(Roommate.user_id == roommate["user_id"]).first()
        if not existing_roommate:
            db.add(Roommate(**roommate))

    db.commit()
    return {"message": "200 mock roommates added successfully"}
