# HealthBridge Admin Panel

The HealthBridge Admin Panel is a web-based dashboard designed to manage the HealthBridge Doctor Appointment System. It provides administrators with tools to oversee doctors, appointments, and platform operations through a modern and responsive interface.

## Features

* Admin Authentication
* Dashboard Overview
* Doctor Management

  * Add New Doctors
  * View Doctor List
  * Manage Doctor Information
* Appointment Management

  * View All Appointments
  * Cancel Appointments
  * Track Appointment Status
* Responsive Admin Interface
* Toast Notifications for User Feedback
* Real-Time Data Fetching from Backend APIs

## 🌐 Live Demo

**Admin Panel:** [https://health-bridgeadmin.vercel.app/]

**Backend API:** https://pixelcartel.onrender.com/


## Tech Stack

### Frontend

* React 19
* React Router DOM
* Axios
* Tailwind CSS v4
* Lucide React Icons
* React Toastify
* Vite

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose

## Project Structure

```bash
src/
├── assets/
├── components/
│   ├── Navbar.jsx
│   └── Sidebar.jsx
├── context/
│   ├── AdminContext.jsx
│   ├── AppContext.jsx
│   └── DoctorContext.jsx
├── pages/
│   ├── Admin/
│   ├── Doctor/
│   └── Login.jsx
├── App.jsx
├── main.jsx
└── index.css
```

## Installation

1. Clone the repository

```bash
git clone <repository-url>
```

2. Navigate to the admin directory

```bash
cd admin
```

3. Install dependencies

```bash
npm install
```

4. Create a `.env` file

```env
VITE_BACKEND_URL=your_backend_url
```

5. Start the development server

```bash
npm run dev
```

## Build for Production

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Dependencies

* React
* React DOM
* React Router DOM
* Axios
* Tailwind CSS
* Lucide React
* React Toastify
* Vite

## Future Enhancements

* Analytics Dashboard
* Appointment Statistics
* User Management
* Notification System
* Report Generation
* Role-Based Access Control

## Author

Developed as part of the **HealthBridge Doctor Appointment Booking System** project.
https://github.com/adi-builds
