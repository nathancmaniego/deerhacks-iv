from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base  # ✅ Add this line
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

DATABASE_URL = "postgresql://neondb_owner:npg_rMG9OqSJX4zj@ep-solitary-hill-a82z4uea-pooler.eastus2.azure.neon.tech/neondb?sslmode=require"

# Database Setup
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Dependency for database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
