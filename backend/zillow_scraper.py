import requests
import json
import pandas as pd

api_key = "dfa895d1-1bdc-4416-93ce-2827916db25d"
listing_url = "https://www.zillow.com/homes/for_rent/?searchQueryState=%7B%22pagination%22%3A%7B%7D%2C%22isMapVisible%22%3Atrue%2C%22mapBounds%22%3A%7B%22west%22%3A-79.70303349699215%2C%22east%22%3A-79.64123540128902%2C%22south%22%3A43.52202034507271%2C%22north%22%3A43.56326914630969%7D%2C%22filterState%22%3A%7B%22fr%22%3A%7B%22value%22%3Atrue%7D%2C%22fsba%22%3A%7B%22value%22%3Afalse%7D%2C%22fsbo%22%3A%7B%22value%22%3Afalse%7D%2C%22nc%22%3A%7B%22value%22%3Afalse%7D%2C%22cmsn%22%3A%7B%22value%22%3Afalse%7D%2C%22auc%22%3A%7B%22value%22%3Afalse%7D%2C%22fore%22%3A%7B%22value%22%3Afalse%7D%2C%22price%22%3A%7B%22min%22%3A118633%2C%22max%22%3Anull%7D%2C%22mp%22%3A%7B%22min%22%3A600%2C%22max%22%3Anull%7D%2C%22beds%22%3A%7B%22min%22%3A1%2C%22max%22%3Anull%7D%2C%22baths%22%3A%7B%22min%22%3A1%2C%22max%22%3Anull%7D%2C%22mf%22%3A%7B%22value%22%3Afalse%7D%2C%22land%22%3A%7B%22value%22%3Afalse%7D%2C%22manu%22%3A%7B%22value%22%3Afalse%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A14%7D"  # The URL of the listing page with the 'searchQueryState' parameter.

#/ API endpoint and default headers
api_url = "https://app.scrapeak.com/v1/scrapers/zillow/listing"

parameters = {"api_key": api_key, "url": listing_url}

response = requests.get(api_url, params=parameters)
data = response.json()  

listings = []
for item in data["data"]["cat1"]["searchResults"].get("listResults", []):
    price = item.get("unformattedPrice", 0)
    # If the price is 0, skip adding to listings
    if price == 0:
        continue
    listing = {
        "id": item.get("id"),
        "title": item.get("statusText", "No Title"),
        "price": price,
        "location": f"{item.get('addressStreet', 'Unknown')}, "
                    f"{item.get('addressCity', 'Unknown')}, "
                    f"{item.get('addressState', 'Unknown')} "
                    f"{item.get('addressZipcode', 'Unknown')}",
        "image_url": item.get("imgSrc", "No Image"),
        "contact_info": item.get("detailUrl", "No URL"),
        "listing_url": item.get("detailUrl", "No URL")
    }
    listings.append(listing)
    
df = pd.DataFrame(listings)
print(df.head(50).to_string())  # prints the first 50 rows in full


# Convert to dictionary
listings_dict = {listing["id"]: listing for listing in listings}

from database.database import SessionLocal
from database.crud import save_listings_to_db_z  # Import database functions

# Start database session
db = SessionLocal()

# Save scraped listings to the database
save_listings_to_db_z(db, listings_dict)

# Close the session
db.close()

print("Listings successfully saved to the database.")