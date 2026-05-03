#  Sri Lanka Police — Three-Wheeler (Tuk-Tuk) Tracking System API

> BSc (Hons) Computing 2024.2P
> **Student ID:** COBSCCOMP242P-044
> **Coventry ID:** 16110315

---

##  Overview

A centralised, real-time RESTful API that enables Sri Lanka Police to track and monitor registered three-wheelers (tuk-tuks) across all 9 provinces and 25 districts. The system collects GPS-based location pings from registered tracking devices and provides authorised law enforcement personnel with:

- 📍 **Live vehicle locations** — last known GPS position of all active tuk-tuks
- 🕐 **Historical movement logs** — time-window filtered location history (7+ days)
- 🗺️ **Province & district filtering** — geo-scoped views per police station jurisdiction
- 🔐 **Role-based access control** — 4 roles: `central_admin`, `provincial_admin`, `police_station`, `viewer`

---

## 🛠️ Technologies Used

| Layer | Technology |
|---|---|
| Runtime | Node.js 20 (ES6 modules) |
| Framework | Express.js 5 |
| Database | MongoDB Atlas |
| ODM | Mongoose 9 |
| Authentication | JSON Web Tokens (JWT) + bcryptjs |
| Validation | express-validator |
| Security | Helmet, CORS, express-rate-limit |
| Documentation | Swagger UI / OpenAPI 3.0 |
| Deployment | AWS Elastic Beanstalk |
| CI/CD | GitHub Actions |

---

## 🚀 Live Deployment

| Resource | URL |
|---|---|
| **API Base URL** | `http://tuktuk-tracking-api-env.eba-2vamptqe.ap-southeast-1.elasticbeanstalk.com` |
| **Swagger Docs** | `http://tuktuk-tracking-api-env.eba-2vamptqe.ap-southeast-1.elasticbeanstalk.com/apidocs` |

---

## 📦 Installation & Local Setup

### Prerequisites

- Node.js 20+
- MongoDB Atlas account (or local MongoDB)
- npm

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/kesh04/tuktuk-tracker-api.git
cd tuktuk-tracker-api

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env
```

### Configure `.env`

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/tuktukDB
JWT_SECRET=your_strong_secret_key_here
JWT_EXPIRE=7d
PORT=3000
NODE_ENV=development
```

### Run the server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

### Seed the database

```bash
# Populate with all 9 provinces, 25 districts, 25 police stations,
# 200+ vehicles, and 7 days of location history
npm run seed
```

---

## 🔑 Default Login Credentials (after seeding)

| Email | Password | Role |
|---|---|---|
| `admin@police.lk` | `Admin@123` | central_admin |
| `provincial@police.lk` | `Provincial@123` | provincial_admin |
| `officer@police.lk` | `Officer@123` | police_station |
| `viewer@police.lk` | `Viewer@123` | viewer |

---

## 📡 Key API Endpoints

### Auth
```
POST   /api/auth/login              → Get JWT token
GET    /api/auth/me                 → Current user profile
```

### Vehicles
```
GET    /api/vehicles                → List all tuk-tuks (geo-filtered)
POST   /api/vehicles                → Register new tuk-tuk
GET    /api/vehicles/:id/location   → Last known GPS location
GET    /api/vehicles/:id/history    → Location ping history
POST   /api/vehicles/ping           → Submit GPS ping (device endpoint)
```

### Locations
```
GET    /api/locations/live          → Live positions of all active vehicles
GET    /api/locations/history       → Historical pings with time-window filter
GET    /api/locations/stats         → Fleet-wide statistics
```

### Admin
```
GET    /api/admin/provinces         → List all 9 provinces
GET    /api/admin/districts         → List districts (geo-scoped by role)
GET    /api/policestations          → List police stations
```

> 📖 Full endpoint reference available at `/apidocs` (Swagger UI)

---

## 🔐 Authentication

All endpoints (except `POST /api/auth/login` and `POST /api/vehicles/ping`) require a JWT Bearer token:

```bash
# Example request with token
curl -H "Authorization: Bearer <your_token>" \
     http://localhost:3000/api/locations/live
```



## 🔄 CI/CD Pipeline

Automated via **GitHub Actions** (`.github/workflows/ci.yml`):

1. **Build job** — runs on every push & pull request to `main`
   - Install dependencies (`npm ci`)
   - Run tests

2. **Deploy job** — runs on push to `main` only
   - Creates deployment ZIP
   - Deploys to **AWS Elastic Beanstalk** automatically

---

## 📊 Simulation Data (after seeding)

| Data | Count |
|---|---|
| Provinces | 9 (all Sri Lanka provinces) |
| Districts | 25 (all Sri Lanka districts) |
| Police Stations | 25+ |
| Registered Tuk-Tuks | 200+ |
| Location Pings | 6,800+ (7 days history, 10s intervals) |
| User Accounts | 4 (one per role) |

---


