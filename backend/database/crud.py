from sqlalchemy.orm import Session
from models.listing import Listing

def save_listings_to_db(db: Session, listings: list):
    for listing in listings:
        # Check if listing already exists
        existing_listing = db.query(Listing).filter(Listing.listing_url == listing["url"]).first()

        if existing_listing:
            # Update the existing listing
            existing_listing.title = listing.get("name", "") or ""
            existing_listing.price = float(listing.get("price", 0)) if listing.get("price", "N/A") != "N/A" else 0
            existing_listing.location = f"{listing.get('address', '')}, {listing.get('city', '')} {listing.get('postal_code', '')}".strip()
            existing_listing.image_url = listing["images"][0] if listing.get("images") else ""
            existing_listing.contact_info =  listing.get("url", "") or ""
            existing_listing.listing_url = listing.get("url", "") or ""
        else:
            # Insert new listing
            new_listing = Listing(
                title=listing.get("name", "") or "",
                price=float(listing.get("price", 0)) if listing.get("price", "N/A") != "N/A" else 0,
                location=f"{listing.get('address', '')}, {listing.get('city', '')} {listing.get('postal_code', '')}".strip(),
                image_url=listing["images"][0] if listing.get("images") else "",
                contact_info =  listing.get("url", "") or "",
                listing_url=listing.get("url", "") or "",
            )
            db.add(new_listing)

    db.commit()