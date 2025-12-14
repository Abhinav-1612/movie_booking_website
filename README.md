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
