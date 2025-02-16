from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import json
import time

# Set up Selenium
chrome_options = Options()
chrome_options.add_argument("--headless")  # Run Chrome in headless mode (no GUI)
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--window-size=1920x1080")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")

# Initialize WebDriver
service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=chrome_options)

# URL to scrape
url = "https://www.torontorentals.com/mississauga?property-type=Condo&property-type=Apartment&property-type=Room&property-type=House&property-type=Studio&property-type=Basement"
url = "https://www.torontorentals.com/mississauga?property-type=Studio&property-type=Apartment&bbox=-79.76033,43.50400,-79.59897,43.59632"

driver.get(url)

# Wait for JavaScript to load (adjust sleep time if needed)
time.sleep(5)

# Get the page source and parse with BeautifulSoup
soup = BeautifulSoup(driver.page_source, "html.parser")

# Close Selenium browser
driver.quit()

# Find all listing items
listings = soup.find_all("div", class_="r-search-results-list__item")

# Extract listing details
all_listings = []

for listing in listings:
    # Find the <script type="application/ld+json"> inside the listing
    script_tag = listing.find("script", type="application/ld+json")
    
    if script_tag:
        try:
            data = json.loads(script_tag.string)
            print(data)
            price_list = []
            if "containsPlace" in data:
                for place in data["containsPlace"]:
                    price = place.get("potentialAction", {}).get("priceSpecification", {}).get("price", None)
                    if price:
                        price_list.append(price)

            # ✅ Determine price range
            min_price = min(price_list) if price_list else None

            listing_info = {
                "name": data.get("name", "N/A"),
                "url": data.get("url", "N/A"),
                "price": min_price if min_price else data.get("potentialAction", {}).get("priceSpecification", {}).get("price", None),
                "currency": data.get("potentialAction", {}).get("priceSpecification", {}).get("priceCurrency", "N/A"),
                "address": data.get("address", {}).get("streetAddress", "N/A"),
                "city": data.get("address", {}).get("addressLocality", "N/A"),
                "postal_code": data.get("address", {}).get("postalCode", "N/A"),
                "number_of_rooms": data.get("numberOfRooms", "N/A"),
                "images": [photo["image"] for photo in data.get("photo", [])]
            }

            all_listings.append(listing_info)
        except json.JSONDecodeError:
            print("Error parsing JSON in a listing.")

# Print all extracted listings
for i, listing in enumerate(all_listings, start=1):
    print(f"Listing {i}:")
    print("Name:", listing["name"])
    print("URL:", listing["url"])
    print("Price:", listing["price"], listing["currency"])
    print("Address:", listing["address"], "-", listing["city"], listing["postal_code"])
    print("Rooms:", listing["number_of_rooms"])
    print("Images:")
    for img in listing["images"]:
        print(" -", img)
    print("\n" + "="*50 + "\n")

print(f"Total Listings Scraped: {len(all_listings)}")

from database.database import SessionLocal
from database.crud import save_listings_to_db  # Import database functions

# Start database session
db = SessionLocal()

# Save scraped listings to the database
save_listings_to_db(db, all_listings)

# Close the session
db.close()

print("Listings successfully saved to the database.")