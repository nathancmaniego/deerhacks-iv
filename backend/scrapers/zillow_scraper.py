import requests
import json
import re

api_key = "dfa895d1-1bdc-4416-93ce-2827916db25d"
listing_url = "https://www.zillow.com/homes/for_rent/?searchQueryState=%7B%22pagination%22%3A%7B%7D%2C%22isMapVisible%22%3Atrue%2C%22mapBounds%22%3A%7B%22west%22%3A-79.70303349699215%2C%22east%22%3A-79.64123540128902%2C%22south%22%3A43.52202034507271%2C%22north%22%3A43.56326914630969%7D%2C%22filterState%22%3A%7B%22fr%22%3A%7B%22value%22%3Atrue%7D%2C%22fsba%22%3A%7B%22value%22%3Afalse%7D%2C%22fsbo%22%3A%7B%22value%22%3Afalse%7D%2C%22nc%22%3A%7B%22value%22%3Afalse%7D%2C%22cmsn%22%3A%7B%22value%22%3Afalse%7D%2C%22auc%22%3A%7B%22value%22%3Afalse%7D%2C%22fore%22%3A%7B%22value%22%3Afalse%7D%2C%22price%22%3A%7B%22min%22%3A118633%2C%22max%22%3Anull%7D%2C%22mp%22%3A%7B%22min%22%3A600%2C%22max%22%3Anull%7D%2C%22beds%22%3A%7B%22min%22%3A1%2C%22max%22%3Anull%7D%2C%22baths%22%3A%7B%22min%22%3A1%2C%22max%22%3Anull%7D%2C%22mf%22%3A%7B%22value%22%3Afalse%7D%2C%22land%22%3A%7B%22value%22%3Afalse%7D%2C%22manu%22%3A%7B%22value%22%3Afalse%7D%7D%2C%22isListVisible%22%3Atrue%2C%22mapZoom%22%3A14%7D"  # The URL of the listing page with the 'searchQueryState' parameter.

#/ API endpoint and default headers
api_url = "https://app.scrapeak.com/v1/scrapers/zillow/listing"

parameters = {"api_key": api_key, "url": listing_url}

response = requests.get(api_url, params=parameters)
data = response.json()  # <-- We have our JSON right here

def extract_float_price(price_str):
    if not price_str:
        return None
    cleaned = (
        price_str.replace("C$", "")
                 .replace("$", "")
                 .replace("/mo", "")
                 .replace(",", "")
                 .strip()
    )
    try:
        return float(cleaned)
    except ValueError:
        return None

def main():
    # data is already defined at the top-level (in global scope).
    # We'll reference it here:
    global data

    listings = []

    # If you have a separate Kijiji-like "listings" block, handle it:
    if "listings" in data:
        kijiji_listings = data["listings"]
        listings.extend(kijiji_listings)

    # Dig into the Zillow block
    zillow_block = (
        data
        .get("props", {})
        .get("pageProps", {})
        .get("searchResults", {})
        .get("cat1", {})
        .get("searchResults", {})
    )

    # Combine the possible arrays
    all_items = []
    if "listings" in zillow_block:
        all_items.extend(zillow_block["listings"])
    if "mapResults" in zillow_block:
        all_items.extend(zillow_block["mapResults"])

    for item in all_items:
        title = item.get("statusText")
        raw_price = item.get("price")
        price = extract_float_price(raw_price)

        address = item.get("address")
        city = item.get("addressCity")
        state = item.get("addressState")
        location = f"{city}, {state}" if (city and state) else address

        image_url = item.get("imgSrc")
        if not image_url:
            photos = item.get("carouselPhotos", [])
            if photos:
                image_url = photos[0].get("url")

        contact_info = "Contact via Zillow"
        listing_url = item.get("detailUrl")

        # Skip if missing title or URL
        if not title or not listing_url:
            continue

        new_listing = {
            "title": title,
            "price": price,
            "location": location,
            "image_url": image_url,
            "contact_info": contact_info,
            "listing_url": listing_url
        }
        listings.append(new_listing)

    final_data = {"listings": listings}
    print(json.dumps(final_data, indent=2))

if __name__ == "__main__":
    main()