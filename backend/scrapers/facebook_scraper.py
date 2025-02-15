from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from typing import List, Dict, Optional
import os
from dotenv import load_dotenv

load_dotenv()

def scrape_facebook_rentals(city: str, max_price: Optional[float] = None) -> List[Dict]:
    # Initialize Chrome in headless mode
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    
    driver = webdriver.Chrome(options=options)
    listings = []
    
    try:
        # Login to Facebook
        driver.get('https://www.facebook.com')
        email_field = driver.find_element(By.ID, 'email')
        password_field = driver.find_element(By.ID, 'pass')
        
        # Use environment variables for credentials
        email_field.send_keys(os.getenv('FB_EMAIL'))
        password_field.send_keys(os.getenv('FB_PASSWORD'))
        password_field.submit()
        
        # Navigate to Marketplace rentals
        marketplace_url = f"https://www.facebook.com/marketplace/{city}/propertyrentals"
        driver.get(marketplace_url)
        
        # Wait for listings to load
        wait = WebDriverWait(driver, 10)
        listings_elements = wait.until(EC.presence_of_all_elements_located(
            (By.CSS_SELECTOR, '[data-testid="marketplace_feed_item"]')
        ))
        
        # Extract listing information
        for element in listings_elements:
            try:
                price_elem = element.find_element(By.CSS_SELECTOR, '[data-testid="marketplace_feed_item_price"]')
                price_text = price_elem.text.strip().replace('$', '').replace(',', '')
                price = float(price_text)
                
                if max_price and price > max_price:
                    continue
                    
                title = element.find_element(By.CSS_SELECTOR, 'span[dir="auto"]').text
                image_url = element.find_element(By.TAG_NAME, 'img').get_attribute('src')
                listing_url = element.find_element(By.TAG_NAME, 'a').get_attribute('href')
                
                listings.append({
                    "title": title,
                    "price": price,
                    "location": city,
                    "image_url": image_url,
                    "contact_info": "Contact via Facebook Marketplace",
                    "listing_url": listing_url,
                    "source": "facebook"
                })
                
            except Exception as e:
                print(f"Error processing Facebook listing: {str(e)}")
                continue
                
    except Exception as e:
        print(f"Error scraping Facebook Marketplace: {str(e)}")
    
    finally:
        driver.quit()
        
    return listings 