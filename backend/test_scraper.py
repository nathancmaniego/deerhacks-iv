import requests
from bs4 import BeautifulSoup

def scrape_kijiji_rentals():
    url = "https://www.kijiji.ca/b-apartments-condos/mississauga-peel-region/c37l1700276?ad=offering&radius=15.0&address=University%20of%20Toronto%20Mississauga"
    headers = {"User-Agent": "Mozilla/5.0"}
    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        print("❌ Failed to fetch Kijiji listings")
        return []

    soup = BeautifulSoup(response.text, "html.parser")
    
    listings = []
    
    for item in soup.find_all("li", class_="data-testid"):
        try:
            # Extract title and URL
            title_tag = item.find("a", class_="title")
            title = title_tag.text.strip() if title_tag else "No Title"
            listing_url = "https://www.kijiji.ca" + title_tag["href"] if title_tag and "href" in title_tag.attrs else "No URL"

            # Extract price
            price_text = item.find("div", class_="price").text.strip().replace("$", "").replace(",", "")
            price = float(price_text) if price_text.replace(".", "", 1).isdigit() else 0

            # Extract location
            location = item.find("div", class_="location").text.strip()

            # Extract image
            image_tag = item.find("img")
            image_url = image_tag["src"] if image_tag else "No Image"

            # Contact information (Static as Kijiji doesn't provide it directly)
            contact_info = "Contact via Kijiji"

            # Append to the listings list
            listings.append({
                "title": title,
                "price": price,
                "location": location,
                "image_url": image_url,
                "contact_info": contact_info,
                "listing_url": listing_url  # New field for the listing URL
            })
        except Exception as e:
            print("Error parsing listing:", e)

    return listings

# Run the scraper and print the results
if __name__ == "__main__":
    results = scrape_kijiji_rentals()
    if results:
        print("✅ Successfully scraped listings:")
        for listing in results[:5]:  # Print first 5 listings
            print(listing)
    else:
        print("❌ No listings found.")
