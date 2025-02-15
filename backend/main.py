from fastapi import FastAPI
from database.database import engine, Base
from routes import roommates, listing

# Create database tables
Base.metadata.create_all(bind=engine)

# Initialize FastAPI App
app = FastAPI()

# Include API Routes
app.include_router(roommates.router, prefix="/api", tags=["Roommates"])
app.include_router(listing.router, prefix="/api", tags=["Listings"])
# app.include_router(scrape.router, prefix="/api", tags=["Scraping"])

@app.get("/")
def home():
    return {"message": "Welcome to the UniHousing API!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)