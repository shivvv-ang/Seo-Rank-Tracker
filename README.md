# 🔎 SEO Rank Tracker (Experimental Project)

This project started as a way for me to explore **Next.js**, **Puppeteer**, and **web scraping**.  
The goal: build a simple tool that checks the **Google Search ranking** of a keyword for a given domain.

I learned *a lot* in this project — even though I couldn't complete everything due to Google's advanced bot protection.  
Still, the experience was extremely valuable and I plan to revisit this once I’m more skilled.

---

## 🚀 What I Learned

### ✅ **1. Next.js fundamentals**
- API routes and backend logic inside Next.js  
- File structure & conventions  
- Building utilities inside `src/libs`  
- Running server-side scripts safely  

### ✅ **2. Web scraping foundations**
Experimented with:
- **Puppeteer**
- **puppeteer-extra**
- **Stealth plugin**
- Human-like mouse movements
- Random delays & scroll
- Handling cookie banners / consent screens

### ⚠️ **3. Google is very hard to scrape**
Google has:
- IP rate limiting  
- Captcha challenges  
- “Unusual traffic detected” pages  
- Bot-detection fingerprints  
- Layout variations  
- Network-level blocking (especially on Indian ISPs)

Even with:
- Stealth plugin  
- Headful mode  
- Delays  
- Random mouse/scroll  
- Proxy support  

Google still flagged the requests without **residential proxies**, which cost money.

This was the point where I decided to **pause the project** and return when I’m more experienced.

---

## 📌 Project Goal (Original Idea)

The rank tracker’s purpose:

```txt
→ Input keyword
→ Search it on Google using Puppeteer
→ Scan all search result links
→ Find the ranking position of the given domain
