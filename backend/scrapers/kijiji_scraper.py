import requests
from bs4 import BeautifulSoup
from typing import List, Dict, Optional
import json

def get_kijiji_url(city: str) -> str:
    # Map common cities to their Kijiji URLs
    city_urls = {
        "mississauga": "mississauga-peel-region",
        "toronto": "city-of-toronto",
        # Add more cities as needed
    }
    
    city_path = city_urls.get(city.lower(), city.lower())
    return f"https://www.kijiji.ca/b-apartments-condos/{city_path}/c37l1700276"

def scrape_kijiji_rentals(city: str, max_price: Optional[float] = None) -> List[Dict]:
    url = get_kijiji_url(city)
    
    try:
        response = requests.get(url, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        listings = []
        
        # Find all listing containers
        for item in soup.find_all('div', class_='search-item'):
            price_elem = item.find('div', class_='price')
            if not price_elem:
                continue
                
            # Extract price and convert to float
            price_text = price_elem.text.strip().replace('$', '').replace(',', '')
            try:
                price = float(price_text)
            except ValueError:
                continue
                
            # Apply price filter if specified
            if max_price and price > max_price:
                continue
                
            # Extract other listing details
            title = item.find('a', class_='title').text.strip()
            location = item.find('div', class_='location').text.strip()
            image_url = item.find('img')['src'] if item.find('img') else None
            listing_url = f"https://www.kijiji.ca{item.find('a', class_='title')['href']}"
            
            listings.append({
                "title": title,
                "price": price,
                "location": location,
                "image_url": image_url,
                "contact_info": "Contact via Kijiji",
                "listing_url": listing_url,
                "source": "kijiji"
            })
            
        return listings
        
    except Exception as e:
        print(f"Error scraping Kijiji: {str(e)}")
        return [] 