# HealthBridge Backend

The HealthBridge Backend is the server-side application powering the HealthBridge Doctor Appointment Booking System. It provides secure APIs for managing users, doctors, appointments, authentication, file uploads, and payment processing.

## Features

### Authentication & Authorization

* User Authentication
* Doctor Authentication
* Admin Authentication
* JWT-Based Authorization
* Protected Routes

### Doctor Management

* Doctor Registration
* Doctor Profile Management
* Doctor Availability Control
* Doctor Dashboard Data

### Appointment Management

* Book Appointments
* View Appointments
* Cancel Appointments
* Appointment Status Tracking

### User Management

* User Registration
* User Login
* Profile Management
* Appointment History

### File Uploads

* Image Upload Support
* Cloudinary Integration
* Multer Middleware

### Payment Integration

* Razorpay Payment Gateway
* Secure Payment Verification

## Tech Stack

### Backend

* Node.js
* Express.js

### Database

* MongoDB Atlas
* Mongoose

### Authentication

* JSON Web Token (JWT)
* bcrypt

### Cloud Storage

* Cloudinary

### File Handling

* Multer

### Payment Gateway

* Razorpay

## Project Structure

```text
backend/
├── config/
│   ├── cloudinary.js
│   └── mongodb.js
│
├── controller/
│   ├── adminController.js
│   ├── doctorController.js
│   └── userController.js
│
├── middleware/
│   ├── authAdmin.js
│   ├── authDoctor.js
│   ├── authUser.js
│   └── multer.js
│
├── models/
│   ├── appointmentModel.js
│   ├── doctorModel.js
│   └── userModel.js
│
├── routes/
│   ├── adminRoutes.js
│   ├── doctorRoutes.js
│   └── userRoutes.js
│
├── uploads/
├── server.js
├── package.json
└── .env
```

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Navigate to Backend

```bash
cd backend
```

### Install Dependencies

```bash
npm install
```

### Create Environment Variables

Create a `.env` file:

```env
PORT=4000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_password

RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret
```

### Run Development Server

```bash
npm run server
```

### Run Production Server

```bash
npm start
```

## API Modules

### User APIs

* Register User
* Login User
* Update Profile
* Book Appointment
* View Appointments

### Doctor APIs

* Doctor Login
* Doctor Dashboard
* Appointment Management
* Profile Updates

### Admin APIs

* Admin Login
* Add Doctor
* Manage Doctors
* Manage Appointments
* Dashboard Analytics

## Dependencies

* bcrypt
* cloudinary
* cors
* dotenv
* express
* jsonwebtoken
* mongoose
* multer
* nodemon
* razorpay
* validator

## Deployment

### Backend Hosting

* Render

### Database

* MongoDB Atlas

### Media Storage

* Cloudinary

## Security Features

* Password Hashing using bcrypt
* JWT Authentication
* Protected API Routes
* Environment Variable Configuration
* Secure Payment Processing

## Author

Developed as part of the **HealthBridge Doctor Appointment Booking System** using the MERN Stack.
https://github.com/adi-builds