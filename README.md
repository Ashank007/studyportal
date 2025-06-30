![Made with Node.js](https://img.shields.io/badge/Made%20with-Node.js-green?style=flat-square)
![GitHub stars](https://img.shields.io/github/stars/Ashank007/studyportal?style=flat-square)
![GitHub license](https://img.shields.io/github/license/Ashank007/studyportal?style=flat-square)
![Express](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)

# 📚 Study Material Manager

A full-stack platform to manage and upload academic study material (Docs, PDFs, PPTs) with role-based access and structured database design. Built with Node.js, MongoDB, and Next.js.


## ✨ Features

- 👤 User Registration & JWT-based Authentication

- 🧑‍💼 Admin Panel to Create Semesters, Subjects, Units & Upload Materials

- 🗂️ Hierarchical Database:

        Semester → Subject → Unit → Materials

- 🧾 Upload support for Docs, PDFs, PPTs

- 🔒 College email-only access restriction (@mietjammu.in)

- 🔐 Secure Cookie-based Sessions

## 📁 Folder Structure
```
.
├── backend
│   ├── controllers/        # All core logic (user, material, etc.)
│   ├── routes/             # Express routes
│   ├── models/             # Mongoose schemas (Sem, Subject, Unit, Material)
│   ├── middlewares/        # Auth & token validators
│   ├── config/             # DB config
│   ├── utils/              # API Response/Error wrappers
│   └── server.js           # Entry file
└── frontend
    ├── src/app/            # App Pages & Layout
    ├── src/components/     # Custom UI Components
    └── public/             # Static assets
```

## 🚀 Getting Started

Backend Setup
```
cd backend
npm install
```
Create .env file with the following variables:
```
MONGODB_URI=your_mongodb_url
JTW_SECRET=your_jwt_secret
LOGIN_TOKEN=admin_token_key
FRONTENT_URL=http://localhost:3000
```
Run the backend server:
```
node server.js
```

Frontend Setup
```
cd frontend
npm install
npm run dev
```

## 📌 API Endpoints
### 🔐 Auth Routes

| Method | Endpoint                      | Description                     |
|--------|-------------------------------|---------------------------------|
| POST   | `/api/v1/user/register`       | Register user                   |
| POST   | `/api/v1/user/login`          | Login                           |
| GET    | `/api/v1/user/logout`         | Logout (Auth required)          |
| POST   | `/api/v1/user/admin`          | Admin login via token           |
| GET    | `/api/v1/user/admin/getall`   | Get all registered users        |

---

### 📄 Material Routes

| Method | Endpoint                       | Description                        |
|--------|--------------------------------|------------------------------------|
| POST   | `/api/v1/material/create`      | Create and attach material to unit |
| DELETE | `/api/v1/material/delete`      | Remove material from unit          |
| POST   | `/api/v1/material/getall`      | Get all materials of a unit        |

---

### 🗂️ Semester Routes

| Method | Endpoint                       | Description                  |
|--------|--------------------------------|------------------------------|
| POST   | `/api/v1/sem/create`           | Create a new semester        |
| DELETE | `/api/v1/sem/delete`           | Delete a semester            |
| GET    | `/api/v1/sem/admingetall`      | Get all semesters (admin)    |
| GET    | `/api/v1/sem/getall`           | Get all semesters (public)   |

---

### 📚 Subject Routes

| Method | Endpoint                           | Description               |
|--------|------------------------------------|---------------------------|
| POST   | `/api/v1/subject/create`           | Create a new subject      |
| DELETE | `/api/v1/subject/delete`           | Delete a subject          |
| POST   | `/api/v1/subject/allsubjects`      | Get all subjects in sem   |

---

### 📘 Unit Routes

| Method | Endpoint                       | Description              |
|--------|--------------------------------|--------------------------|
| POST   | `/api/v1/unit/create`          | Create a unit            |
| DELETE | `/api/v1/unit/delete`          | Delete a unit            |
| POST   | `/api/v1/unit/getall`          | Get all units of subject |



## 🧠 Tech Stack

- Frontend: Next.js 14, Tailwind CSS, TypeScript

- Backend: Express.js, MongoDB, Mongoose

- Authentication: JWT + Secure Cookies

- UI Enhancements: Chakra UI + Lottie + Animations


## 📄 License

- This project is licensed under the MIT License.

