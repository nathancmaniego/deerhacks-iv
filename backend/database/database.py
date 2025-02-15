from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base  # ✅ Add this line
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://deerhacks_iv_user:5JWmSMiybABwDTwQ9AzX13FTNUwSmBR2@dpg-cuo9bsd2ng1s73e5g9n0-a.oregon-postgres.render.com/deerhacks_iv")

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
