# 🚚 TtukDoctor  
**Mobile Platform for Heavy-Equipment Repair Service Matching**


## 📘 Overview  
**TtukDoctor** is a mobile web platform that connects heavy-equipment operators (e.g., forklifts, dump trucks, and mixers) with nearby repair shops in real time.  
Developed using **Ionic + React + Firebase**, this project was created for the **2025 Republic of Korea Air Force Startup Competition**, where it won a **Merit Award (Top 8 out of 380+ teams)**.  

## 🌍 Social Impact
TtukDoctor engaged over **120 mechanics and equipment operators** to collect feedback for feature refinement and secured **MOUs with 6+ organizations**, including the **Korea Construction Equipment Association** and the **Korea Construction Equipment Repair Association**, strengthening cooperation across the industry.  
By **web-crawling and updating over 1,200 repair shop records**—many of which were previously missing from Google or Naver Maps—the platform built a **comprehensive national database** covering every region in South Korea.  
This effort **reduced information gaps** in the construction equipment service industry and improved accessibility for equipment operators.  
The platform also supports **young professionals in their 20s and 30s** entering the market by providing transparent, reliable information and easy digital access.  
During the MVP stage, user feedback was **highly positive**, with participants expressing strong anticipation for the official launch.  
TtukDoctor continues to focus on solving real-world inefficiencies while ensuring that technology strengthens, rather than replaces, human expertise.

The platform addresses inefficiencies in the repair coordination process by introducing:
- 🔍 **Location-based service matching**
- 🧾 **Digitalized repair history**

---

## 🏆 Achievements  
- 🥇 **Merit Award**, *2025 Republic of Korea Air Force Startup Competition*  
- 🧠 **Excellence Award**, *Risktaker’s Blueprint Startup Competition (2025)*  
- 👥 Developed by a **4-member team** (Full-Stack 2, OCR AI, Research)  
- 🚀 Recognized for its **AI-driven repair digitalization concept** and **on-site service innovation**
- 🎯 Selected for strong **social impact and industrial AI application potential**

---


<img width="700" height="500" alt="image" src="https://github.com/user-attachments/assets/45524945-cc3a-484a-abea-82081ca6d77b" />
<img width="628" height="783" alt="image" src="https://github.com/user-attachments/assets/ab469ca5-3c01-4023-ab49-83deb7199400" />




## 🛠️ Tech Stack
- **Frontend:** Ionic + React (TypeScript)
- **Backend Infrastructure:** Firebase (Firestore, Storage, Auth, FCM)
- **Cloud Functions (Optional):** Serverless event handling for data automation
- **Geolocation API:** Naver Maps Platform


---

## 🧠 Key Features  
- 🗺️ **Nearby Repair Shop Search** – GPS & Naver Maps integration  
- 🔧 **Equipment Registration & Repair Workflow** – Simplified user process  
- 📷 **Image Upload to Firebase Storage** – Damage & maintenance photos  
- 🔔 **Real-time Notifications (FCM)** – Instant mechanic alerts  
- 👨‍🔧 **Mechanic Dashboard (Planned)** – Manage ongoing requests  
- 🧾 **Digital Repair Logs (Planned)** – AI-driven OCR data automation


  <img width="400" height="600" alt="image" src="https://github.com/user-attachments/assets/fab5a414-1321-4114-b713-7a7735eb4182" />
### -Nearby Repair Shop Search-

---

## 🧩 Codebase Overview

TtukDoctor combines UI and logic within each page while managing data through Firebase service functions.  
The project also includes Naver Maps integration for location-based features.

- **Pages:** Main user interfaces such as Home, Login, My Vehicle, Quotes, and Reservation flows (OnSite1–4, Reserve1–5)  
- **Services:** A collection of functions that handle Firebase operations (Garages, Users, Auth<Login, Signup>, etc.)  
- **Map Feature:** Uses the Naver Maps SDK (loaded in `index.html`) and a clustering script (`MarkerClustering.js`) for displaying nearby repair shops  
- **Theme:** Global color, font, and layout variables for consistent design  


## 📂 Repository Structure

/src → Core logic and React pages
/public → Static assets (logos, HTML entry point)
/firebase.json → Firebase Hosting configuration
/tsconfig.json → TypeScript compiler configuration

📺 App Video: Watch on YouTube

https://youtu.be/-IgLjWqCCtg?si=GUOLBrQbTJffaa5V (Beta Version)
https://youtube.com/shorts/xzneEHc1b5I?si=xubBfjIXCblvCi-d (Quote Process)


👥 Team & Roles
Name	Role	Contribution
**Jungmyung Lee**	Full-stack Developer	Built Ionic + React frontend, Firebase DB integration, and location logic
Team Member 2	Full-stack Developer	Built Ionic + React frontend, Firebase DB integration, and UI/UX design
Team Member 3	Coordinated overall workflow, task distribution
Team Member 4	Designer	UX/UI layout, Figma prototyping, and visual design





🏅 Awards: Merit Award (Air Force Startup), Excellence Award (Risktaker’s Blueprint)
💡 Vision: Building AI-powered, human-centered solutions that enhance accessibility and efficiency across industries.
