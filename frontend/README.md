# HealthBridge Frontend

HealthBridge is a modern doctor appointment booking platform that allows patients to discover doctors, schedule appointments, manage profiles, and track appointment history through a clean and responsive user interface.

## 🌐 Live Demo

**Client Panel:** [Live Demo](healthbridge-self.vercel.app)

**Backend API:** https://pixelcartel.onrender.com/


## Features

### Patient Features

* User Registration & Login
* Browse Available Doctors
* Search by Specialization
* Book Doctor Appointments
* View Appointment History
* Manage User Profile
* Responsive Design for All Devices

### User Experience

* Interactive Homepage
* Doctor Listings
* Appointment Booking System
* Toast Notifications
* Fast Navigation with React Router

## Tech Stack

### Frontend

* React 19
* React Router DOM
* Axios
* React Toastify
* Tailwind CSS v4
* Vite

### Backend

* Node.js
* Express.js
* MongoDB Atlas

## Project Structure

```text
frontend/
├── public/
│
├── src/
│   ├── assets/
│   │
│   ├── Components/
│   │   ├── Banner.jsx
│   │   ├── Footers.jsx
│   │   ├── Header.jsx
│   │   ├── Navbar.jsx
│   │   ├── SpecialityMenu.jsx
│   │   └── TopDoctors.jsx
│   │
│   ├── Context/
│   │   └── AppContext.jsx
│   │
│   ├── Pages/
│   │   ├── Home.jsx
│   │   ├── Doctors.jsx
│   │   ├── Appointment.jsx
│   │   ├── MyAppointments.jsx
│   │   ├── MyProfile.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   └── Login.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
└── vite.config.js
```

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Navigate to Frontend

```bash
cd frontend
```

### Install Dependencies

```bash
npm install
```

### Create Environment Variables

Create a `.env` file:

```env
VITE_BACKEND_URL=http://localhost:4000
```

### Run Development Server

```bash
npm run dev
```

## Production Build

Build the application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Pages

### Home

* Landing page
* Featured doctors
* Medical specialties

### Doctors

* View all doctors
* Filter by specialty

### Appointment

* Book appointments with doctors

### My Appointments

* View booked appointments
* Manage appointments

### My Profile

* Update user profile information

### About

* Platform information

### Contact

* Contact details and support

### Login

* User authentication

## Dependencies

* React
* React DOM
* React Router DOM
* Axios
* React Toastify
* Tailwind CSS
* Vite

## Deployment

### Frontend Hosting

* Vercel

### Backend Hosting

* Render

### Database

* MongoDB Atlas

## Future Enhancements

* Online Payment Integration
* Doctor Ratings & Reviews
* Email Notifications
* Appointment Reminders
* Video Consultation Support
* Advanced Search Filters

## Author

Developed as part of the **HealthBridge Doctor Appointment Booking System** using the MERN Stack.
https://github.com/adi-builds
