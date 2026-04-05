# 💰 Finance Data Processing & Access Control Backend

## 📌 Overview

This project is a backend system for a **Finance Dashboard Application** that allows different types of users to manage and analyze financial records based on their roles.

The system demonstrates:

* Clean backend architecture
* Role-based access control (RBAC)
* Financial data processing
* Aggregated analytics for dashboard insights

The goal of this project is to showcase backend engineering practices including API design, data modeling, access control, and system reliability.

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Mongoose)
* **Authentication:** JWT (JSON Web Tokens)
* **Security:** bcrypt (password hashing)
* **Middleware:** Express middleware (RBAC, error handling)
* **Utilities:** Morgan (logging), CORS, Rate Limiting

---

## 🧱 Architecture

The project follows a **modular and scalable structure**:

```
 /
 ├── config/        # Database connection
 ├── models/        # Mongoose schemas
 ├── controllers/   # Request handling logic
 ├── routes/        # API routes
 ├── middleware/    # Auth, RBAC, error handling
 ├── app.js         # Express app setup
 └── server.js      # Server entry point
```

### Design Approach:

* Separation of concerns (routes → controllers → models)
* Middleware-based access control
* Clean and reusable logic

---

## 👤 User Roles & Permissions

| Role    | Permissions                              |
| ------- | ---------------------------------------- |
| Viewer  | Can only access dashboard summary        |
| Analyst | Can view financial records + dashboard   |
| Admin   | Full access (users + records management) |

---

## 🔐 Authentication & Authorization

* JWT-based authentication is used
* Users must include token in headers:

```
Authorization: Bearer <token>
```

* Role-based access control is enforced using middleware

---

## 📊 Financial Records

Each financial record includes:

* Amount
* Type (income / expense)
* Category
* Date
* Notes
* Soft delete flag

---

## 🚀 API Endpoints

### 🔑 Auth

#### Login

```
POST /api/users/login
```

---

### 👤 Users (Admin Only)

#### Create User

```
POST /api/users
```

#### Get All Users

```
GET /api/users
```

#### Update User

```
PATCH /api/users/:id
```

---

### 💰 Financial Records

#### Create Record (Admin)

```
POST /api/records
```

#### Get Records (Admin, Analyst)

```
GET /api/records
```

#### Update Record (Admin)

```
PATCH /api/records/:id
```

#### Delete Record (Admin - Soft Delete)

```
DELETE /api/records/:id
```

---

### 🔍 Filtering & Query Support

```
GET /api/records?type=expense
GET /api/records?category=food
GET /api/records?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
GET /api/records?page=1&limit=10
GET /api/records?search=keyword
```

---

### 📈 Dashboard

#### Summary API

```
GET /api/dashboard/summary
```

Returns:

* Total Income
* Total Expense
* Net Balance
* Category-wise totals
* Monthly trends

---

## 🧠 Business Logic

### Aggregations Implemented:

* Total income and expenses using MongoDB aggregation
* Net balance calculation
* Category-wise grouping
* Monthly trends using date grouping

---

## 🛡️ Access Control Logic

* Implemented using middleware (`authorize`)
* Each route checks user role before allowing access
* Prevents unauthorized actions such as:

  * Viewer creating records
  * Analyst modifying data

---

## ✅ Validation & Error Handling

* Input validation for:

  * Required fields
  * Date range correctness
  * Amount validity
* Proper HTTP status codes:

  * 400 → Bad Request
  * 401 → Unauthorized
  * 403 → Forbidden
  * 500 → Server Error

---

## 💾 Data Persistence

* MongoDB used for persistent storage
* Mongoose schemas define structure and constraints
* Soft delete implemented using `isDeleted` flag

---

## ⚡ Additional Features

* Pagination for large datasets
* Search functionality
* Rate limiting (prevents abuse)
* Logging using Morgan
* CORS enabled for frontend integration

---

## 🧪 How to Run

### 1. Clone the repository

```
git clone https://github.com/Vidittamrakar21/zorvyn.git
cd zorvyn
```

### 2. Install dependencies

```
npm install
```

### 3. Create `.env` file

```
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

### 4. Run server

```
node server.js
```

Server runs on:

```
http://localhost:5000
```

---

## ⚠️ Assumptions Made

* Authentication is JWT-based (no OAuth or session-based auth)
* Roles are predefined (viewer, analyst, admin)
* Financial records are user-associated but not strictly isolated
* Basic validation implemented (not exhaustive)

---

## 🔮 Future Improvements

* Refresh token mechanism
* Role management UI
* Advanced analytics (weekly trends, forecasting)
* Unit and integration testing
* API documentation using Swagger
* Multi-tenant architecture

---

## 🎯 Conclusion

This project demonstrates:

* Backend system design
* Clean API structuring
* Role-based access control
* Financial data processing with analytics

It focuses on **clarity, correctness, and maintainability**, aligning with real-world backend development practices.

---
