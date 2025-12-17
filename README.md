# TtukDoctor  
**Mobile Platform for Heavy-Equipment Repair Service Matching**

<img width="500" height="620" alt="image" src="https://github.com/user-attachments/assets/ab469ca5-3c01-4023-ab49-83deb7199400" />


## Overview  
**TtukDoctor** is a mobile web platform that connects heavy-equipment operators (e.g., forklifts, dump trucks, and mixers) with nearby repair shops in real time.  
Developed using **Ionic + React + Firebase**.

## Problem - Solution - Validation - Social Impact

> Built a national-scale platform improving repair accessibility and transparency for Korea’s heavy-equipment industry.

### Problem  
Repair coordination was fragmented across offline networks — operators often had to rely on **Naver, Google, or even acquaintances-of-acquaintances** to find a repair shop.  
Many shops weren’t listed online, and the lack of accessible information made **price and service comparison nearly impossible**, especially for operators in rural areas and for new entrants in their 20s–30s.

### Solution  
TtukDoctor connects operators and mechanics through real-time map-based matching and a **nationwide dataset of 1,200+ repair shops covering every region in Korea** (web-crawled and continuously updated).  
It provides clear reservation flows (OnSite1–4, Reserve1–5), **photo-based feedback and review features** for transparency, and an accessibility-first UI.

### Validation  
Engaged **250+ mechanics and equipment operators** to collect feedback for feature refinement and secured **MOUs with 6+ organizations**, including the **Korea Construction Equipment Association** and the **Korea Construction Equipment Repair Association**.  
MVP testers gave **very positive** feedback and expressed strong interest in the official launch.

### Social Impact  
By **web-crawling and updating over 1,200 repair shop records**—many of which were previously missing from Google or Naver Maps—TtukDoctor built a **comprehensive national database** covering every region in South Korea.  
This effort **reduced information gaps** in the construction equipment service industry and **improved accessibility** for small and rural repair shops.  
The platform also supports **young professionals in their 20s and 30s** entering the market by providing transparent, reliable, and easy-to-access digital information.  
Through cooperation with **6+ industry associations** and continuous field feedback from mechanics, TtukDoctor demonstrates strong potential for **industrial AI adoption** and **social innovation**.  

<img width="638" height="476" alt="image" src="https://github.com/user-attachments/assets/5274712c-779e-492a-af37-66aa2753d440" />


---

## Achievements  
- **Chief of Staff for Personnel Award**, *2025 Republic of Korea Air Force Startup Competition*  
- **Excellence Award**, *Risktaker’s Blueprint Startup Competition (2025)*  

---

<img width="700" height="500" alt="image" src="https://github.com/user-attachments/assets/45524945-cc3a-484a-abea-82081ca6d77b" />  

- Developed by a **4-member team** (Full-Stack x2, PM, UI/UX Designer)

## Tech Stack
- **Frontend:** Ionic + React (TypeScript)
- **Backend Infrastructure:** Firebase (Firestore, Storage, Auth, FCM)
- **Cloud Functions (Optional):** Serverless event handling for data automation
- **Geolocation API:** Naver Maps Platform

---

## Key Features  
- **Nearby Repair Shop Search** – GPS & Naver Maps integration  
- **Equipment Registration & Repair Workflow** – Simplified user process  
- **Image Upload to Firebase Storage** – Damage & maintenance photos  
- **Real-time Notifications (FCM)** – Instant mechanic alerts  
- **Mechanic Dashboard (Planned)** – Manage ongoing requests  
- **Digital Repair Logs (Planned)** – AI-driven OCR data automation

<div align="center">
  <img width="400" height="600" alt="Nearby Repair Shop Search" src="https://github.com/user-attachments/assets/fab5a414-1321-4114-b713-7a7735eb4182" />
  <br>
  <i>-Nearby Repair Shop Search-</i>
</div>


---

## Codebase Overview

TtukDoctor combines UI and logic within each page while managing data through Firebase service functions.  
The project also includes Naver Maps integration for location-based features.

- **Pages:** Main user interfaces such as Home, Login, My Vehicle, Quotes, and Reservation flows (OnSite1–4, Reserve1–5)  
- **Services:** A collection of functions that handle Firebase operations (Garages, Users, Auth(Login, Signup), etc.)  
- **Map Feature:** Uses the Naver Maps SDK (loaded in `index.html`) and a clustering script (`MarkerClustering.js`) for displaying nearby repair shops  
- **Theme:** Global color, font, and layout variables for consistent design

## Repository Structure

/src → Core logic and React pages  
/public → Static assets (logos, HTML entry point)  
/firebase.json → Firebase Hosting configuration  
/tsconfig.json → TypeScript compiler configuration 


## App Video: Watch on YouTube

(https://youtu.be/-IgLjWqCCtg?si=GUOLBrQbTJffaa5V) (Beta Version)
(https://youtube.com/shorts/xzneEHc1b5I?si=xubBfjIXCblvCi-d) (Quote Process)

## Team & Roles  

**Jungmyung Lee**  
Full-stack Developer  
Built Ionic + React frontend, Firebase DB integration, and location logic  
**Team Member 2**  
Full-stack Developer  
Built Ionic + React frontend, Firebase DB integration, and UI/UX design  
**Team Member 3**  
Project Coordinator  
Managed overall workflow and task distribution  
**Team Member 4**  
Designer  
UX/UI layout, Figma prototyping, and visual design  


