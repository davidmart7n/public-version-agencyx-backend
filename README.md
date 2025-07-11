# AgencyX Backend — Public Version 🧩

This repository contains a **public and stripped-down version** of the backend for **AgencyX**, a professional productivity and business management platform.

> ⚠️ This is **not the complete source code**. Sensitive configurations, service logic, and internal endpoints have been **intentionally removed or anonymized**.

---

## 📦 What's included

- General package and folder structure of the original Spring Boot project.
- Selected example controllers, service interfaces, and DTOs.
- Helpful **inline comments** to help developers understand the structure.
- Some classes contain `// private logic` or are **left empty** to indicate intentional removal.

---

## 🔐 What’s been removed

To ensure security and protect internal business logic, the following have been **excluded**:

- Environment variables and config files (`application.properties`, `application.yaml`)
- Authentication and security logic (JWT, Firebase Auth, user roles, filters)
- Business-critical services and logic (e.g., Firestore integration, FCM, AI modules)
- Internal endpoints and private REST APIs

---

## 💡 Why release a public version?

This public version serves to:

- Offer a **transparent view** of the backend's modular and scalable architecture.
- Inspire other developers building real-world Spring Boot microservices.
- Showcase the API structure, layering strategy, and clean code principles.
- Serve as a technical portfolio piece while protecting proprietary logic.

---

## 🚀 Tech Stack (in the original full version)

- **Node.js 20**
- **Express.js**
- **Firebase Admin SDK** (Auth & Firestore)
- **Google Cloud Functions**
- **FCM (Firebase Cloud Messaging)**
- **CORS**, **dotenv**, **nodemon**, etc.

---

## ⚠️ License & Usage

This public version is released for **educational and reference purposes only**.  
All rights to the full source code, internal systems, and branding remain with the original authors.  
**Do not reuse or redistribute this code in production environments.**

---

Feel free to explore the structure, review the public snippets, and contact us if you're interested in the full version or its capabilities.

<p align="center"><i>— Built with intention and security by the Maen Studios team 🛡️</i></p>
