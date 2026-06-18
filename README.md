# HealthBridge 🏥

HealthBridge is a full-stack Doctor Appointment Booking System built using the MERN Stack. The platform connects patients, doctors, and administrators through a centralized healthcare management system.

## Overview

HealthBridge streamlines the appointment booking process by allowing patients to discover doctors, schedule appointments, manage profiles, and track appointment history. Doctors can manage their availability and appointments, while administrators oversee the entire platform through a dedicated dashboard.

## Features

### Patient Portal

* User Registration & Authentication
* Browse Doctors by Specialization
* Book Appointments
* View Appointment History
* Manage Profile Information

### Doctor Portal

* Doctor Authentication
* Manage Availability
* View Scheduled Appointments
* Update Doctor Profile
* Dashboard Overview

### Admin Panel

* Admin Authentication
* Add & Manage Doctors
* Monitor Appointments
* Dashboard Analytics
* Platform Management

### Additional Features

* JWT Authentication
* Cloudinary Image Uploads
* Razorpay Payment Integration
* Responsive UI
* Secure API Architecture

## Tech Stack

### Frontend

* React
* React Router DOM
* Axios
* React Toastify
* Tailwind CSS
* Vite

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose

### Authentication

* JWT (JSON Web Token)
* bcrypt

### Cloud & Services

* Cloudinary
* Razorpay
* MongoDB Atlas

## Project Structure

```text
HealthBridge/
│
├── frontend/        # Patient Application
├── admin/           # Admin Dashboard
├── backend/         # Backend API Server
│
└── README.md
```

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd HealthBridge
```

### Install Dependencies

Frontend:

```bash
cd frontend
npm install
```

Admin:

```bash
cd admin
npm install
```

Backend:

```bash
cd backend
npm install
```

## Environment Variables

Create `.env` files where required.

### Backend

```env
PORT=4000
MONGODB_URI=
JWT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

ADMIN_EMAIL=
ADMIN_PASSWORD=

RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

### Frontend & Admin

```env
VITE_BACKEND_URL=http://localhost:4000
```

## Running the Project

### Backend

```bash
cd backend
npm run server
```

### Frontend

```bash
cd frontend
npm run dev
```

### Admin Panel

```bash
cd admin
npm run dev
```

## Deployment

| Service       | Platform      |
| ------------- | ------------- |
| Frontend      | Vercel        |
| Admin Panel   | Vercel        |
| Backend       | Render        |
| Database      | MongoDB Atlas |
| Media Storage | Cloudinary    |

## Future Enhancements

* Video Consultation
* Email Notifications
* Appointment Reminders
* Doctor Reviews & Ratings
* Advanced Analytics Dashboard

## Contributors

* Aditya Paul
* Team HealthBridge

## License

This project is developed for educational and academic purposes.
