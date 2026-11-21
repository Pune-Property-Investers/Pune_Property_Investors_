# Pune Property Investors - Backend API (Enterprise Clean Architecture)

Node.js & Express REST API built with **Controller - DTO - Service - Repository - Model - View** architecture and enterprise security.

---

## 🏗️ Clean Architecture Pipeline

```text
Incoming Client Request
         │
         ▼
[Security Config]       ──▶ Helmet (HTTP headers), Dynamic CORS, Sliding-Window Rate Limiter
         │
         ▼
[Route Layer]           ──▶ Express Router (/api/properties, /api/enquiries)
         │
         ▼
[Controller Layer]      ──▶ Lean HTTP Handlers (propertyController, enquiryController)
         │
         ▼
[DTO Layer]             ──▶ Validates input schemas, regex (10-digit Indian phones), sanitizes text
         │
         ▼
[Service Layer]         ──▶ Core business logic, multi-criteria filtering, ranking, enrichment
         │
         ▼
[Repository Layer]      ──▶ Data access abstraction (PropertyRepository, EnquiryRepository)
         │
         ▼
[Model Layer / DB]      ──▶ Raw Database ORM / ODM queries / In-memory store
         │
         ▼
[View Layer]            ──▶ renderSuccess() & renderError() standardized JSON envelopes
```

---

## 📁 Directory Structure

```text
Pune_Properties_Investors_Backend/
├── src/
│   ├── config/
│   │   ├── db.js                 # Database connection config
│   │   └── security.js           # Helmet, CORS whitelist & rate-limiter configs
│   ├── dtos/                     # [DTO] Data Transfer Objects
│   │   ├── PropertyDTO.js        # Input validation & query sanitization
│   │   └── EnquiryDTO.js         # Phone regex & lead validation
│   ├── controllers/              # [CONTROLLER] HTTP Request Handlers
│   │   ├── propertyController.js # /api/properties controller
│   │   └── enquiryController.js  # /api/enquiries controller
│   ├── services/                 # [SERVICE] Business & Domain Logic
│   │   ├── propertyService.js    # Search, category matching, pricing, recommendation sort
│   │   └── enquiryService.js     # Lead prioritization, notifications, status flow
│   ├── repositories/             # [REPOSITORY] Data Access Abstraction Layer
│   │   ├── propertyRepository.js # Property queries & persistence calls
│   │   └── enquiryRepository.js  # Enquiry & lead persistence calls
│   ├── models/                   # [MODEL] Data schemas & persistence
│   │   ├── PropertyModel.js      # Property schema (with residential, commercial, plot)
│   │   └── EnquiryModel.js       # Customer inquiry schema
│   ├── views/                    # [VIEW] Standardized JSON Response Formatter
│   │   └── responseView.js       # Standardized response envelopes
│   ├── routes/                   # Routing declarations
│   │   ├── propertyRoutes.js
│   │   ├── enquiryRoutes.js
│   │   └── index.js
│   ├── middlewares/
│   │   └── errorHandler.js       # Centralized error handler
│   ├── app.js                    # Express app configuration & security pipeline
│   └── server.js                 # Entry point & server listener
├── .env / .env.example
├── package.json
└── README.md
```

---

## 💡 Why the Repository Layer?
- **Zero Business Logic Coupling**: `PropertyService` does not know whether data lives in MongoDB, PostgreSQL, MySQL, or an in-memory cache.
- **Seamless Database Migration**: Switching between databases requires changing only the Repository layer; controllers, DTOs, and services remain untouched.
- **Testability**: Repositories can be mocked easily in unit tests.
