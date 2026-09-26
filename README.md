# 💻 DevTinder — Developer Networking Platform

DevTinder is a full-stack developer networking platform that helps developers discover other developers, build professional connections, and collaborate based on their interests, skills, and profiles.

The project is built using a **MERN-based architecture** with a separate React frontend and Node.js/Express backend, with additional technologies for authentication, real-time communication, caching, rate limiting, and email services.

---

## 🚀 Key Features

### 🔐 Authentication & Security

* User registration and login
* Secure password hashing using **bcrypt**
* **JWT-based authentication**
* JWT stored in **HTTP-only cookies**
* Protected API routes using authentication middleware
* Input validation using `validator`
* CORS configuration
* API rate limiting using `express-rate-limit`
* Environment-based configuration using `dotenv`

### 👤 User Profile Management

* Create and manage developer profiles
* Update profile information
* Developer-focused profile data
* Profile discovery through the developer feed

### 🤝 Developer Connections

* Discover other developers
* Send connection requests
* Accept or reject incoming requests
* Ignore developers
* View accepted connections
* Prevent invalid or duplicate connection interactions
* Manage the complete connection-request lifecycle

### 📰 Developer Feed

* Personalized developer discovery
* Excludes users that should not appear in the current user's feed
* Pagination support for efficient data retrieval
* Backend filtering and query optimization

### 💬 Real-Time Communication

* Real-time communication using **Socket.IO**
* Event-based client/server communication
* Real-time updates without repeatedly polling the server
* Socket.IO client integrated into the React frontend

### ⚡ Performance & Backend Engineering

* MongoDB database with Mongoose ODM
* Structured REST APIs
* Modular Express routing
* Middleware-based authentication
* Redis integration for high-speed data operations/caching
* API rate limiting
* Database query optimization
* Scheduled background tasks using `node-cron`

### 📧 Email Integration

* AWS SES integration for sending emails
* Automated background tasks for email-related workflows
* Scheduled jobs using `node-cron`

---

# 🛠️ Tech Stack

## Frontend

| Technology           | Purpose                                |
| -------------------- | -------------------------------------- |
| **React 19**         | Building the user interface            |
| **Vite**             | Frontend development and build tooling |
| **Redux Toolkit**    | Global state management                |
| **React Redux**      | Connecting Redux with React            |
| **React Router DOM** | Client-side routing                    |
| **Axios**            | HTTP/API communication                 |
| **Tailwind CSS**     | Utility-first styling                  |
| **DaisyUI**          | UI components                          |
| **Socket.IO Client** | Real-time communication                |

The frontend dependencies and tooling are defined in the project's Vite/React setup.

---

## Backend

| Technology             | Purpose                         |
| ---------------------- | ------------------------------- |
| **Node.js**            | JavaScript runtime              |
| **Express.js**         | REST API framework              |
| **MongoDB**            | Primary database                |
| **Mongoose**           | MongoDB ODM                     |
| **JWT**                | Authentication                  |
| **bcrypt**             | Password hashing                |
| **cookie-parser**      | Cookie-based authentication     |
| **Socket.IO**          | Real-time communication         |
| **Redis**              | High-speed data storage/caching |
| **express-rate-limit** | API rate limiting               |
| **validator**          | Input validation                |
| **AWS SES**            | Email delivery                  |
| **node-cron**          | Scheduled background jobs       |
| **date-fns**           | Date manipulation               |
| **dotenv**             | Environment configuration       |

These backend technologies are reflected in the project's package configuration.

---

# 🏗️ Architecture

The project follows a **separated frontend/backend architecture**:

```text
                    ┌──────────────────────┐
                    │      React Client    │
                    │                      │
                    │ React + Redux        │
                    │ React Router         │
                    │ Tailwind + DaisyUI   │
                    └──────────┬───────────┘
                               │
                         HTTP / REST API
                               │
                         Socket.IO
                               │
                    ┌──────────▼───────────┐
                    │    Node.js Server    │
                    │      Express.js      │
                    │                      │
                    │ Routes               │
                    │ Middleware           │
                    │ Authentication       │
                    │ Business Logic       │
                    └──────┬───────┬───────┘
                           │       │
              ┌────────────┘       └─────────────┐
              ▼                                  ▼
      ┌───────────────┐                  ┌───────────────┐
      │    MongoDB    │                  │     Redis     │
      │   + Mongoose  │                  │ Cache / Data  │
      └───────────────┘                  └───────────────┘
                           │
                           ▼
                    ┌───────────────┐
                    │    AWS SES    │
                    │    Emails     │
                    └───────────────┘
```

---

# 📁 Project Structure

```text
75ways-project-submission/
│
├── devTinder-web/          # React frontend
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── ...
│
├── devTinder/              # Node.js backend
│   ├── src/
│   ├── package.json
│   └── ...
│
└── README.md
```

The submission repository combines the frontend and backend into a single repository for easier evaluation.

---

# 🔄 Application Flow

### 1. Registration

```text
User
 ↓
React Registration Form
 ↓
REST API
 ↓
Express Controller
 ↓
Validation
 ↓
Password Hashing
 ↓
MongoDB
 ↓
JWT Cookie
```

### 2. Authentication

```text
Browser
 ↓
HTTP-only JWT Cookie
 ↓
Authentication Middleware
 ↓
JWT Verification
 ↓
Authenticated Request
```

### 3. Developer Discovery

```text
Authenticated User
        ↓
Developer Feed API
        ↓
MongoDB Query
        ↓
Filter Existing Interactions
        ↓
Paginated Developer Profiles
        ↓
React Feed
```

### 4. Connection Request

```text
Developer A
     ↓
Send Connection Request
     ↓
Backend Validation
     ↓
MongoDB
     ↓
Developer B
     ↓
Accept / Reject
```

### 5. Real-Time Communication

```text
React Client
     │
     │ Socket.IO
     ▼
Node.js Server
     │
     ├── Event Handling
     │
     └── Real-time Updates
     │
     ▼
Other Connected Client
```

---

# 🔒 Security Considerations

The backend implements several security-focused practices:

* Passwords are never stored in plain text.
* Passwords are hashed using **bcrypt**.
* Authentication uses JWT.
* JWT tokens are delivered through cookies rather than exposed directly in API responses.
* Protected routes use authentication middleware.
* Input validation is performed before processing requests.
* CORS is configured for frontend/backend communication.
* Rate limiting helps protect APIs against excessive requests.
* Sensitive configuration is managed through environment variables.

---

# ⚡ Performance Considerations

The application incorporates several techniques to improve backend performance and scalability:

* MongoDB with Mongoose for structured database interaction
* Pagination for developer feed data
* Redis integration for fast data access
* API rate limiting
* Efficient filtering of developer interactions
* Socket.IO for event-driven real-time communication
* Scheduled background processing using `node-cron`

---

# 🧩 Backend Design

The backend is organized around modular Express routes, controllers, services, middleware, and database models.

This separation helps keep:

* HTTP request handling
* Business logic
* Authentication
* Database operations
* Validation

independent from each other and easier to maintain.

---

# 📦 Installation & Setup

## Prerequisites

Make sure you have installed:

* Node.js
* npm
* MongoDB / MongoDB Atlas
* Redis
* Git

---

## 1. Clone the repository

```bash
git clone https://github.com/cAptA1n-bot/75ways-project-submission.git

cd 75ways-project-submission
```

---

## 2. Setup Backend

```bash
cd devTinder
npm install
```

Create a `.env` file containing the required environment variables.

Example:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
REDIS_URL=your_redis_connection_string
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret
```

Start the development server:

```bash
npm run dev
```

---

## 3. Setup Frontend

Open another terminal:

```bash
cd devTinder-web
npm install
```

Configure the frontend environment variables as required by the application.

Start the frontend:

```bash
npm run dev
```

---

# 🧪 Development Commands

### Backend

```bash
npm run dev
```

Starts the Node.js backend using Nodemon.

```bash
npm start
```

Starts the backend in normal mode.

### Frontend

```bash
npm run dev
```

Starts the Vite development server.

```bash
npm run build
```

Creates a production build.

```bash
npm run preview
```

Previews the production build locally.

```bash
npm run lint
```

Runs ESLint checks.

---

# 🌱 Engineering Practices

Some of the engineering concepts demonstrated in this project include:

* REST API development
* Authentication & authorization
* Secure cookie handling
* Password hashing
* MongoDB schema design
* API validation
* Middleware architecture
* State management
* Client-side routing
* Real-time communication
* Caching/data-store integration
* Rate limiting
* Scheduled background jobs
* Email service integration
* Separation of frontend and backend concerns

---

# 📌 Future Improvements

Potential future improvements include:

* Advanced developer search and filtering
* Recommendation/matching algorithms
* Direct messaging enhancements
* Notifications
* Improved caching strategies
* Automated testing
* CI/CD pipeline
* Production monitoring
* More granular authorization and roles

---

# 👨‍💻 Author

**cAptA1n-bot**

Built as a full-stack project demonstrating practical experience with modern JavaScript development, REST APIs, authentication, databases, real-time communication, and backend engineering.

---

## ⭐ Project Highlights

> **DevTinder is more than a basic CRUD application.**

The project demonstrates a complete full-stack workflow:

**React → REST APIs → Express → Authentication → MongoDB → Redis → Socket.IO → AWS SES**

with an emphasis on **secure authentication, modular backend architecture, real-time communication, API protection, and scalable application design.**

---
