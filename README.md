# 🚚 TtukDoctor  
**Mobile Platform for Heavy-Equipment Repair Service Matching**

---

## 📘 Overview  
**TtukDoctor** is a mobile web platform that connects heavy-equipment operators (e.g., forklifts, dump trucks, and mixers) with nearby repair shops in real time.  
Developed using **Ionic + React + Firebase**, this project was created for the **2025 Republic of Korea Air Force Startup Competition**, where it won a **Merit Award (Top 8 out of 380+ teams)**.  

The platform addresses inefficiencies in the repair coordination process by introducing:
- 🔍 **Location-based service matching**
- 🧾 **Digitalized repair history**
- 🤖 **AI-powered OCR automation** that converts handwritten repair logs into structured data.

---

## 🏆 Achievements  
- 🥇 **Merit Award**, *2025 Republic of Korea Air Force Startup Competition*  
- 🧠 **Excellence Award**, *Risktaker’s Blueprint Startup Competition (2025)*  
- 👥 Developed by a **4-member team** (Frontend 2, OCR AI, Research)  
- 🚀 Recognized for combining **AI digitization and field-service innovation**  
- 🎯 Selected for strong **social impact and industrial AI application potential**

---

<img width="1044" height="779" alt="image" src="https://github.com/user-attachments/assets/45524945-cc3a-484a-abea-82081ca6d77b" />



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

---

## 🧩 Architecture  
```plaintext
src/
 ┣ components/
 ┣ pages/
 ┣ firebase/
 ┣ hooks/
 ┣ utils/
 ┗ App.tsx

public/
 ┣ assets/
 ┗ index.html

📂 Repository Structure

/src → Core logic and React pages
/public → Static assets (logos, HTML entry point)
firebase.json → Firebase Hosting configuration
storage.rules / firestore.rules → Security access control
package.json → Dependency management

🎥 Demo & Showcase

📺 Demo Video: Watch on YouTube

🌐 Live Preview (if hosted): https://ttukdoctor.web.app

👥 Team & Roles
Name	Role	Contribution
Jungmyung Lee	Full-stack Developer	Built Ionic + React frontend, Firebase DB integration, and location logic
Team Member 2	Backend Developer	Firestore schema, FCM, and authentication logic
Team Member 3	AI Researcher	OCR model prototype for repair record automation
Team Member 4	Designer	UX/UI layout, Figma prototyping, and visual design
🌍 Social Impact

TtukDoctor enhances repair accessibility for small mechanics and equipment operators, particularly in rural or underrepresented areas.
By digitizing handwritten records and streamlining real-time coordination, the platform promotes equitable access to maintenance resources and helps bridge the gap between traditional labor and digital innovation.
It reflects a core belief that AI should empower, not replace, human expertise.

📈 Future Development

🤖 Integrate Naver CLOVA OCR for automated repair record recognition

🧭 Add route optimization for mobile mechanic dispatch

💬 Implement AI chatbot for repair scheduling and status updates

📊 Expand as a SaaS platform for fleet data analytics

🔒 Improve database security via Firebase Rules and token validation

🧾 License

This project is licensed under the MIT License.
See the LICENSE
 file for more details.

👨‍💻 Developer

Jungmyung Lee
📧 jm0541@naver.com

🌐 GitHub: LifeIsBasketball

🏅 Awards: Merit Award (Air Force Startup), Excellence Award (Risktaker’s Blueprint)
💡 Vision: Building AI-powered, human-centered solutions that enhance accessibility and efficiency across industries.
