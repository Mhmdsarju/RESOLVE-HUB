# ResolveHub

**Respond Faster. Resolve Smarter.**

ResolveHub is an enterprise-grade Incident Management and War Room Collaboration Platform designed to help organizations detect, manage, and resolve critical incidents efficiently through real-time collaboration and structured workflows.

The platform enables engineering and operations teams to coordinate during incidents, improve response times, maintain audit trails, and ensure operational reliability.

---

## 🚀 Features

### Incident Management

* Create and manage incidents manually or automatically.
* Severity-based incident classification (P1, P2, P3, P4).
* Incident lifecycle tracking.
* Incident status management.
* Incident timeline and event history.

### War Room Collaboration

* Real-time incident war rooms.
* Team collaboration during critical incidents.
* Live participant presence tracking.
* Real-time messaging using Socket.IO.
* Audio and video collaboration using WebRTC.

### Task Management

* Create and assign incident-related tasks.
* Track task progress and status.
* Monitor task ownership and completion.

### Authentication & Authorization

* Secure Email/Password authentication.
* Google OAuth integration.
* JWT-based authentication.
* Refresh Token Rotation.
* Multi-Factor Authentication (MFA).
* Role-Based Access Control (RBAC).
* Device Session Management.

### Organization Management

* Multi-organization support.
* Team creation and management.
* Member invitation and onboarding.
* Role assignment and permissions.

### Monitoring & Integrations

* Integrate external monitoring systems.
* Prometheus integration.
* Grafana integration.
* Webhook-based incident creation.
* Monitoring project management.

### Notifications

* Email notifications.
* Real-time notifications.
* Incident escalation notifications.
* SLA breach alerts.

### Analytics & Reporting

* Incident analytics dashboard.
* MTTR (Mean Time To Resolution) tracking.
* Historical incident reports.
* Team performance analytics.

### Audit & Compliance

* Complete audit logging.
* User activity tracking.
* Incident history tracking.

### File Management

* Secure file upload and sharing.
* Cloud-based storage integration.

---

# 🏗️ Architecture

ResolveHub follows a **Modular Monolithic Architecture** combined with **Clean Architecture** principles.

## Architectural Principles

* Modular Monolith
* Clean Architecture
* SOLID Principles
* Domain-Driven Design Concepts
* Separation of Concerns

---

# 🛠️ Tech Stack

## Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* React Router DOM
* Zustand
* TanStack Query
* React Hook Form
* Zod
* Axios
* Socket.IO Client

## Backend

* Node.js
* Express.js
* TypeScript
* Socket.IO

## Databases

### PostgreSQL

Used for storing:

* Users
* Organizations
* Roles
* Incidents
* Tasks
* Permissions
* Audit Logs

### MongoDB

Used for storing:

* Chat Messages
* Activity Streams
* Incident Notes
* System Events

### Redis

Used for:

* Session Management
* Presence Tracking
* Caching
* Rate Limiting
* Temporary Storage

## ORM

* Prisma ORM

## Messaging & Event Streaming

* Apache Kafka

## Monitoring & Observability

* Prometheus
* Grafana

## External Services

* Cloudinary
* Nodemailer
* WebRTC

---

# 📂 Project Structure

```bash
backend/
├── src/
│
├── app/
├── config/
├── infrastructure/
├── shared/
├── modules/
│
├── prisma/
└── index.ts
```

---

# 🔐 Security Features

* JWT Authentication
* Refresh Token Rotation
* Password Hashing with Bcrypt
* Helmet Security
* CORS Protection
* Input Validation using Zod
* Role-Based Access Control
* Secure HTTP-only Cookies

---

# ⚙️ Installation

## Clone Repository

```bash
git clone <repository-url>
cd ResolveHub
```

## Backend Setup

```bash
cd backend
npm install
```

## Run Development Server

```bash
npm run dev
```

---

# 🌟 Future Enhancements

* AI-assisted incident analysis
* Automated incident summarization
* Intelligent escalation recommendations
* Advanced analytics dashboard
* Distributed architecture migration

---

# 👨‍💻 Author

**Mohammed Sarjun**

---

# 📄 License

This project is licensed under the MIT License.
