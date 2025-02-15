from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import json
import time

# Import SQLAlchemy session & models
from database.database import get_db
from models.listing import Listing

def configure_selenium():
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--window-size=1920x1080")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    return driver

def fetch_listings(driver, url):
    driver.get(url)
    time.sleep(5)  # Wait for JavaScript content to load
    soup = BeautifulSoup(driver.page_source, "html.parser")
    driver.quit()
    return soup.find_all("div", class_="r-search-results-list__item")

def extract_listing_data(listing):
    script_tag = listing.find("script", type="application/ld+json")
    if script_tag:
        try:
            data = json.loads(script_tag.string)
            return Listing(
                title=data.get("name", None),
                price=data.get("potentialAction", {}).get("priceSpecification", {}).get("price", None),
                location=data.get("address", {}).get("streetAddress", None),
                image_url=data.get("photo", [{}])[0].get("image", None),
                contact_info=None,
                listing_url=data.get("url", None)
            )
        except json.JSONDecodeError:
            print("❌ Error parsing JSON for a listing.")
    return None

def insert_listings_to_db(listings):
    db = get_db()
    for listing in listings:
        new_listing = extract_listing_data(listing)
        if new_listing:
            existing_listing = db.query(Listing).filter_by(listing_url=new_listing.listing_url).first()
            if not existing_listing:
                db.add(new_listing)
            else:
                print(f"Skipping duplicate: {new_listing.listing_url}")
    db.commit()
    db.close()

def main():
    url = "https://www.torontorentals.com/toronto/condos?beds=1%2B&p=2"
    driver = configure_selenium()
    listings = fetch_listings(driver, url)
    insert_listings_to_db(listings)
    print(f"✅ Inserted {len(listings)} listings into the database successfully!")

if __name__ == "__main__":
    main()