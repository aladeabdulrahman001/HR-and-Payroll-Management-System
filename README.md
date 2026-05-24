# HR and Payroll Management System

A backend API for HR and payroll operations, including user onboarding, role-based access, attendance tracking, department management, and payroll generation.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Environment](#environment)
- [Running the Server](#running-the-server)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Admin Operations](#admin-operations)
  - [HR Operations](#hr-operations)
  - [Employee Operations](#employee-operations)
  - [Payroll Operations](#payroll-operations)
- [Roles](#roles)
- [Notes](#notes)

## Features

- Role-based authentication and authorization
- Invite-based onboarding for ADMIN, HRM, and STAFF users
- Department creation and listing
- Employee management and deactivation
- Attendance clock-in / clock-out
- Payroll salary structure management
- Payroll generation and payslip retrieval

## Installation

1. Clone the repository.
2. Navigate to the `src` folder:
   ```bash
   cd HR-and-Payroll-Management-System/src
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Environment

Create a `.env.development.local` file with the required environment variables.

Common variables include:

- `PORT`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `CLIENT_URL`
- MongoDB connection variables as defined in `src/utils/env.js`

## Running the Server

Start the app from the `src` folder:

```bash
node app.js
```

The API base routes are mounted in `src/app.js` as:

- `/api/v1/auth`
- `/api/employees`
- `/api/hr`
- `/api/admin`
- `/api/payroll`

A root `GET /` request returns a welcome message.

## API Endpoints

### Authentication

This API uses invite-based onboarding. Users must be invited by an ADMIN or HRM user before they can set up an account and sign in.

> There is no public self-registration endpoint in this version.

#### `POST /api/v1/auth/sign-in`

Log in and receive a JWT token.

Body:

```json
{
  "email": "user@example.com",
  "password": "strongPassword123"
}
```

#### `POST /api/v1/auth/resend-invite`

Resend an invitation email for a pending invited user. This route is rate limited.

Body:

```json
{
  "email": "invited@example.com"
}
```

#### `POST /api/v1/auth/setup-account`

Complete account setup after receiving an invite token. This creates the user password and activates the account.

Body:

```json
{
  "token": "invite-token-here",
  "password": "newStrongPassword123"
}
```

### Admin Operations

All `/api/admin` operations require authentication and ADMIN authorization.

#### `POST /api/admin/onboard/admin`

Invite a new ADMIN user.

Body:

```json
{
  "email": "admin@example.com",
  "firstName": "Admin",
  "lastName": "User",
  "phone": "+1234567890",
  "address": "123 Main St",
  "departmentId": "<departmentObjectId>",
  "jobTitle": "Administrator",
  "hireDate": "2026-01-01"
}
```

#### `POST /api/admin/onboard/hr`

Invite a new HRM user.

Body is the same as `onboard/admin`.

#### `POST /api/admin/onboard/department`

Create a new department.

Body:

```json
{
  "name": "Human Resources",
  "description": "Handles payroll and employee relations",
  "managerId": "<optionalUserObjectId>"
}
```

#### `GET /api/admin/departments`

Get a list of all departments.

#### `GET /api/admin/employees`

Get a paginated list of active employees.

Query parameters:

- `page` (default `1`)
- `limit` (default `10`)
- `departmentId`
- `sort`

#### `PATCH /api/admin/employee/:id/deactivate`

Deactivate an employee profile by employee ID.

### HR Operations

All `/api/hr` operations require authentication.

#### `POST /api/hr/onboard/employee`

Invite a new STAFF employee.

Body:

```json
{
  "email": "employee@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890",
  "address": "123 Main St",
  "departmentId": "<departmentObjectId>",
  "jobTitle": "Software Engineer",
  "hireDate": "2026-01-01"
}
```

#### `GET /api/hr/employees`

Get a paginated list of active employees.

#### `GET /api/hr/employees/attendance`

Get all attendance records.

#### `GET /api/hr/employee/:id/attendance`

Get attendance details for a single employee by ID.

### Employee Operations

All `/api/employees` operations require authentication and role authorization for `ADMIN`, `HRM`, or `STAFF`.

#### `POST /api/employees/clockin`

Record a clock-in event for the authenticated user.

#### `POST /api/employees/clockout`

Record a clock-out event for the authenticated user.

### Payroll Operations

All `/api/payroll` operations require authentication.

#### `POST /api/payroll/salary-structure`

Create or update a salary structure for an employee.

Body:

```json
{
  "userId": "<userObjectId>",
  "baseSalary": 50000,
  "taxRate": 0.2,
  "standardAllowances": ["housing", "transport"],
  "standardDeductions": ["pension"]
}
```

#### `GET /api/payroll/salary-structure/:userId`

Get salary structure for a specific employee.

#### `POST /api/payroll/generate`

Generate payroll for an employee for a month and year.

Body:

```json
{
  "userId": "<userObjectId>",
  "month": 5,
  "year": 2026
}
```

#### `GET /api/payroll/employee/:userId`

Get all payslips for a specific employee.

#### `GET /api/payroll/:payslipId`

Get a single payslip by ID.

## Roles

- `ADMIN` — full access to admin onboarding, department management, employee listing, and payroll generation.
- `HRM` — can onboard employees and view attendance and employee data.
- `STAFF` — can clock in/out, view salary structure, and view own payslips.

- 
## API Documentation

A complete Postman collection is available for testing all 29 API endpoints across 6 categories (Authentication, Admin, HR, Employee, Payroll, and Health Check).

### Postman Collection Files
- `HR_Payroll_API_Postman_Collection.json` — 29 pre-configured requests
- `HR_Payroll_Dev_Environment.json` — Environment variables for testing

## Contributors

- [aladeabdulrahman001](https://github.com/aladeabdulrahman001) — API Documentation & Postman Collection


## Notes

- This project uses invite-based onboarding. Users are invited via admin or HR routes, receive an email with a setup token, and must complete `/api/v1/auth/setup-account` before they can log in.
- `role` values for onboarding are assigned by middleware (`ADMIN`, `HRM`, `STAFF`).
- Protect routes with the JWT token returned from `/api/v1/auth/sign-in`.
- Validation error responses are returned with `success: false` and an `error` object.
- The root endpoint `GET /` returns a welcome message.
