# Event Management Platform

## 🚀 Overview
The **Event Management Platform** is a comprehensive web application designed to help organizers create, customize, and manage events seamlessly. It provides a streamlined experience for both **event organizers and attendees**, ensuring smooth event planning, RSVP tracking, and real-time notifications.

---

## 📌 Features

### 🔹 Admin Portal
- **Super Admin Role**: Assign, revoke, or replace the Student Admin dynamically.
- **Student Admin Role**: Create and manage events, RSVP tracking, and calendar integration.
- **Secure Login**: Authentication system for Super Admin and Student Admin.
- **Event Management Dashboard**: Track and modify events efficiently.

### 🔹 Organizer Module
- **Event Creation & Customization**: Add event details (name, date, time, location, description, etc.).
- **Template Management**: Choose from pre-designed templates for event pages.
- **Bulk Upload**: Import event details using CSV files.

### 🔹 Attendee Portal
- **Event Discovery**: Browse events using dynamic search and filters (location, category, date, etc.).
- **RSVP System**: Confirm or decline attendance with real-time updates.
- **Automated Notifications**: Reminders via email or in-app alerts before the event.
- **Calendar Sync**: Add events to Google Calendar, Outlook, etc., via downloadable .ics files.

### 🔹 Bonus Features
- **Dynamic Template Management**: Customize event templates via a user-friendly UI.
- **Advanced Event Analytics**: View RSVP trends, attendance rates, and engagement metrics.
- **Nearby Event Suggestions**: AI-powered event recommendations based on user preferences.

---

## 🛠️ Tech Stack
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js (Planned)
- **Database**: MongoDB / Firebase (Planned)
- **Authentication**: JWT (JSON Web Tokens)
- **Calendar Integration**: Google Calendar API, Outlook API

---

## 📂 Folder Structure
```
.
├── Backend
│   ├── db
│   ├── index.js
│   ├── middlewares
│   ├── models
│   ├── node_modules
│   ├── package.json
│   ├── package-lock.json
│   └── routes
├── folder_structure.txt
└── Frontend
    ├── event-sphere
        ├── eslint.config.js
        ├── folder_structure.txt
        ├── index.html
        ├── node_modules
        ├── package.json
        ├── package-lock.json
        ├── public
        ├── README.md
        ├── src
        │   ├── App.css
        │   ├── App.jsx
        │   ├── assets
        │   ├── components
        │   ├── contexts
        │   ├── index.css
        │   ├── main.jsx
        │   ├── pages
        │   ├── services
        │   └── utils
        └── vite.config.js
        └── package-lock.json




---

## 🏗️ Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/41chaitanya/code-sphere.git
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Run the Development Server

Configure environment variables in a `.env` file:
   ```sh
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
```sh
npm run dev
```

### 4️⃣ Build for Production
```sh
npm run build
```

---

## 📅 Future Enhancements
- ✅ Super Admin approval system for events
- ✅ Payment integration for paid events
- ✅ User dashboard with event history

---

## 🤝 Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

---

## 📜 License
This project is licensed under the **MIT License**.

---


