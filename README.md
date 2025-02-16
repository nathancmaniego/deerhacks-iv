# 🏡 Dormigo – Hackathon Project Summary
**Project Website:** https://deerhacks-iv--kappa.vercel.app/

## 🚀 Theme: Discovery
**💡 Idea:** A one‑stop platform that helps students discover rental listings and roommates by aggregating listings from Zillow and Toronto Rentals—all while using roommate matching and trust scoring to reduce scams.

## The Problem: Student Housing is Broken
Due to fragmented and unreliable platforms, students struggle to find safe, affordable, and convenient housing. Current options are inefficient, resulting in wasted time, scams, and difficulty finding roommates.

### 1️⃣ Housing Listings are Scattered & Messy
- Students search across multiple websites such as Zillow and Toronto Rentals.
- Listings are often duplicated, outdated, or missing key details (e.g., utilities, furnished status).
- No smart search—students must manually filter through dozens of unrelated listings.

### 🔹 Why Dormigo Works:
- ✅ **Aggregated Listings:** Combines data from Zillow and Toronto Rentals into one platform.
- ✅ **Smart Filtering & Search:** Quickly sort by rent, location, lease type, while filtering by price.
- ✅ **Roommate Matching:** Matches students based on lifestyle habits, sleep schedules, study preferences, and cleanliness levels.

## 🎯 Core Features for MVP
1. **🔍 Aggregated Housing Listings**  
   Scrapes Zillow and Toronto Rentals to display rental and sublet listings in one place.
2. **📍 Location Search & Price Filtering**  
   Allows users to search listings by location and filter by price.
3. **🤝 Roommate Matching**  
   Matches students based on lifestyle habits, sleep schedules, study preferences, and cleanliness levels.

## ⚙️ Tech Stack
- **Frontend:**  
  - React + Vite  
  - Tailwind CSS
- **Backend:**  
  - Python & FastAPI  
  - PostgreSQL
- **Data Collection:**  
  - BeautifulSoup and Selenium (for Zillow & Toronto Rentals scraping)

## 🧐 Meaning Behind the Name

**Dormigo** is a fusion of two words: **Dorm** + **Amigo**.

- **Dorm:** Reflects the core focus on student housing—dormitories and other student living spaces.
- **Amigo:** Spanish for "friend," conveying the platform's commitment to creating a friendly, trustworthy community where students can find reliable roommates and feel at home.

Together, Dormigo suggests a supportive, community‑driven environment that helps you find a place to live and connects you with like‑minded roommates—making the often challenging search for safe and affordable student housing a more personal and reassuring experience.

## 🌟 Inspiration & Reflection

**Inspiration:**  
We were inspired by the real‑life challenges students face when searching for safe and affordable housing, as well as the difficulty in finding compatible roommates. We wanted to create a solution that not only aggregates listings from various sources but also makes the roommate matching process simple and reliable.

**What We Learned:**  
Through this project, we gained valuable insights into full‑stack development, integrating web scraping with modern web frameworks, and building a user‑friendly interface. We learned the importance of validating diverse data sources and creating an intuitive search experience that builds trust among users.

**How We Built the Project:**  
We began by outlining the key issues in the student housing market and prototyping a solution. We then set up a backend using Python and FastAPI along with PostgreSQL for data management, and implemented data collection using BeautifulSoup and Selenium to scrape Zillow and Toronto Rentals. Finally, we built the frontend using React, Vite, and Tailwind CSS. Roommate matching was implemented based on user‑specified lifestyle preferences to help connect students with like‑minded roommates.

**Challenges Faced:**  
One of the biggest challenges was dealing with inconsistent data formats across multiple listing sources and ensuring data freshness. Additionally, fine‑tuning the roommate matching algorithm to deliver accurate matches required extensive testing and iteration. Balancing these technical challenges while maintaining a smooth user experience was a significant learning curve for us.
