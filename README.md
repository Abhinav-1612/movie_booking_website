# 🎬 MovieTime - Smart Movie Booking System

**MovieTime** is a full-stack movie ticket booking application built with **Next.js** and **MySQL**. It features real-time seat availability, dynamic pricing, and an intelligent chatbot assistant.

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🚀 Features

* **🎥 Browse Movies:** View currently showing movies with details like genre, duration, and ratings.
* **🎫 Dynamic Booking:** Real-time seat selection with different price tiers (Morning ₹150 / Evening ₹250 / Night ₹350).
* **🤖 AI Chatbot:** A smart assistant (available in bottom-right) that answers queries about shows, prices, and offers using SQL-based logic.
* **🔐 User Accounts:** Sign up, Login, and "My Bookings" history.
* **⚡ Admin Panel:** Special dashboard for Admins to add movies and view booking stats.
* **📱 Responsive Design:** Works perfectly on Desktop and Mobile (built with Tailwind CSS).

## 🛠️ Tech Stack

* **Frontend:** Next.js (React), Tailwind CSS
* **Backend:** Next.js API Routes (Node.js)
* **Database:** MySQL (Compatible with Local MySQL & TiDB Cloud)
* **Authentication:** Custom JWT / Session-based (via Database)
* **Deployment:** Vercel (Frontend/API) + TiDB Serverless (Database)

---

## 🏗️ Database Schema

The system uses a relational database with the following structure:

* **Movies:** Stores movie details (Title, Genre, Poster).
* **Theatres & Screens:** Manages locations and screen capacity.
* **ShowTable:** Links Movies to Screens with specific Dates/Times & Prices.
* **Bookings:** Tracks customer reservations.
* **Customers:** User data and Admin roles.

*(See `setup_database.sql` in the repo for the full schema)*

---
## 📊 Entity Relationship (ER) Diagram

```mermaid
erDiagram
    MOVIES ||--o{ SHOWTABLE : "shown in"
    THEATRES ||--o{ SCREENS : "has"
    SCREENS ||--o{ SHOWTABLE : "hosts"
    CUSTOMERS ||--o{ BOOKINGS : "makes"
    SHOWTABLE ||--o{ BOOKINGS : "receives"

    MOVIES {
        int Movie_ID PK
        string Title
        string Genre
        int Duration
        string Image_Path
    }
    THEATRES {
        int Theatre_ID PK
        string Theatre_Name
        string Location
    }
    SCREENS {
        int Screen_ID PK
        int Theatre_ID FK
        int Total_Seats
    }
    SHOWTABLE {
        int Show_ID PK
        int Movie_ID FK
        int Screen_ID FK
        date Show_Date
        time Show_Time
        int Price
    }
    CUSTOMERS {
        int Cust_ID PK
        string Name
        string Email
        string Phone
        string Password
        string Role
    }
    BOOKINGS {
        int Booking_ID PK
        int Cust_ID FK
        int Show_ID FK
        int Seats_Booked
        date Booking_Date
    }
## ⚙️ Local Installation Guide

Follow these steps to run the project on your laptop.

### 1. Prerequisites
* Node.js installed.
* MySQL Server (Workbench) installed and running.

### 2. Clone the Repository
```bash
git clone [https://github.com/YOUR_USERNAME/movie-booking.git](https://github.com/YOUR_USERNAME/movie-booking.git)
cd movie-booking

3. Install Dependencies
Bash

npm install
Here is the complete README.md file in a single code block, ready to copy and paste.Markdown# 🎬 MovieTime - Smart Movie Booking System

**MovieTime** is a full-stack movie ticket booking application built with **Next.js** and **MySQL**. It features real-time seat availability, dynamic pricing, and an intelligent chatbot assistant.

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## 🚀 Features

* **🎥 Browse Movies:** View currently showing movies with details like genre, duration, and ratings.
* **🎫 Dynamic Booking:** Real-time seat selection with different price tiers (Morning ₹150 / Evening ₹250 / Night ₹350).
* **🤖 AI Chatbot:** A smart assistant (available in bottom-right) that answers queries about shows, prices, and offers using SQL-based logic.
* **🔐 User Accounts:** Sign up, Login, and "My Bookings" history.
* **⚡ Admin Panel:** Special dashboard for Admins to add movies and view booking stats.
* **📱 Responsive Design:** Works perfectly on Desktop and Mobile (built with Tailwind CSS).

## 🛠️ Tech Stack

* **Frontend:** Next.js (React), Tailwind CSS
* **Backend:** Next.js API Routes (Node.js)
* **Database:** MySQL (Compatible with Local MySQL & TiDB Cloud)
* **Authentication:** Custom JWT / Session-based (via Database)
* **Deployment:** Vercel (Frontend/API) + TiDB Serverless (Database)

---

## 🏗️ Database Schema

The system uses a relational database with the following structure:

* **Movies:** Stores movie details (Title, Genre, Poster).
* **Theatres & Screens:** Manages locations and screen capacity.
* **ShowTable:** Links Movies to Screens with specific Dates/Times & Prices.
* **Bookings:** Tracks customer reservations.
* **Customers:** User data and Admin roles.

*(See `setup_database.sql` in the repo for the full schema)*

---

## ⚙️ Local Installation Guide

Follow these steps to run the project on your laptop.

### 1. Prerequisites
* Node.js installed.
* MySQL Server (Workbench) installed and running.

### 2. Clone the Repository
```bash
git clone [https://github.com/YOUR_USERNAME/movie-booking.git](https://github.com/YOUR_USERNAME/movie-booking.git)
cd movie-booking
3. Install DependenciesBashnpm install
4. Setup DatabaseOpen MySQL Workbench.Create a new connection/query tab.Copy the code from setup_database.sql (included in this repo).Run the script to create the database and dummy data.5. Configure ConnectionOpen lib/db.js and update your MySQL credentials:JavaScriptconst pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'YOUR_MYSQL_PASSWORD', // <--- Update this
  database: 'movie_booking',
});
6. Run the AppBashnpm run dev
Open http://localhost:3000 in your browser.☁️ Deployment (Free)This project is optimized for Vercel and TiDB Cloud.Database: Create a free Serverless Cluster on TiDB Cloud. Run the SQL script there (remove CREATE DATABASE lines for TiDB).Environment Variables: Create a .env file in the root for cloud keys:Code snippetDB_HOST=gateway01.xxx.tidbcloud.com
DB_USER=xxx.root
DB_PASSWORD=xxx
DB_NAME=test
DB_PORT=4000
Deploy: Push to GitHub and import the repo into Vercel. Add the Environment Variables in the Vercel dashboard.📸 Screenshots(You can upload screenshots to your repo's public/ folder and link them here later)Home PageBooking Seat(Add Image)(Add Image)👨‍💻 AuthorAbhinav SinghRole: Full Stack DeveloperInstitute: Indian Institute of Information Technology (IIIT), NagpurCourse: DBMS Project
