# HR and Payroll Management System

A backend API for HR and payroll management with invite-based onboarding, role-based access, attendance tracking, department administration, salary structures, and payslip generation.

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

- Invite-based onboarding for `ADMIN`, `HRM`, and `STAFF`
- Role-based authentication and authorization
- Department creation and listing
- Employee onboarding and deactivation
- Attendance clock-in / clock-out
- Leave request and review workflows
- Salary structure management and payroll generation
- Payslip retrieval

## Installation

1. Clone the repository.
2. Change into the `src` folder:
   ```bash
   cd HR-and-Payroll-Management-System/src
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Quick Start

```bash
cd HR-and-Payroll-Management-System/src
npm install
node app.js
```

Then open `http://localhost:<PORT>/` in your browser or send requests to the API.

## Environment

Create a `.env.development.local` file at the project root (next to `app.js`) with the required environment variables.

Required environment variables include:

- `PORT`
- `DB_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `CLIENT_URL`
- `RESEND_API_KEY`

## Running the Server

From the `src` folder, run:

```bash
node app.js
```

The API base routes are mounted in `src/app.js` as:

- `/api/v1/auth`
- `/api/employee`
- `/api/hr`
- `/api/admin`
- `/api/payroll`

A root `GET /` request returns a welcome message.

## API Endpoints

### Authentication

The API uses invite-based onboarding. Users must be invited before they can set up an account or sign in.

#### `POST /api/v1/auth/sign-in`

Authenticate and receive a JWT.

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

Complete account setup using an invite token.

Body:

```json
{
  "token": "invite-token-here",
  "password": "newStrongPassword123"
}
```

### Admin Operations

All `/api/admin` routes require authentication and `ADMIN` authorization.

#### `POST /api/admin/onboard/admin`

Invite a new `ADMIN` user.

Body example:

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

Invite a new `HRM` user.

Body: same as `onboard/admin`.

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

Get all departments.

#### `GET /api/admin/employees`

Get active employees.

Query parameters:

- `page` (default `1`)
- `limit` (default `10`)
- `departmentId`
- `sort`

#### `PATCH /api/admin/employee/:id/deactivate`

Deactivate an employee profile.

### HR Operations

All `/api/hr` routes require authentication and `ADMIN` or `HRM` role.

#### `POST /api/hr/onboard/employee`

Invite a new `STAFF` employee.

Body example:

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

#### `GET /api/hr/departments`

Get all departments.

#### `GET /api/hr/employees`

Get active employees.

#### `GET /api/hr/employees/attendance`

Get all attendance records.

#### `GET /api/hr/employee/:id/attendance`

Get attendance for a specific employee.

#### `GET /api/hr/leaves`

Get all leave requests.

#### `GET /api/hr/employee/:id/leaves`

Get leave requests for a specific employee.

#### `PATCH /api/hr/leaves/:id/review`

Review a leave request.

### Employee Operations

All `/api/employee` routes require authentication and `ADMIN`, `HRM`, or `STAFF` authorization.

#### `POST /api/employee/clockin`

Record clock-in for the authenticated user.

#### `POST /api/employee/clockout`

Record clock-out for the authenticated user.

#### `POST /api/employee/leave/request`

Request leave.

#### `PATCH /api/employee/leave/:id/cancel`

Cancel a leave request.

#### `GET /api/employee/leaves/me`

Get the authenticated user's leave requests.

#### `GET /api/employee/payslips/me`

Get the authenticated user's payslips.

### Payroll Operations

The payroll router is mounted under `/api/payroll`.

#### `POST /api/payroll/salary-structure`

Create or update a salary structure.

Body example:

```json
{
  "employeeId": "<employeeObjectId>",
  "baseSalary": 50000,
  "taxRate": 0.2,
  "standardAllowances": [{ "name": "housing", "amount": 5000 }],
  "standardDeductions": [{ "name": "pension", "amount": 2000 }]
}
```

#### `GET /api/payroll/salary-structure/:employeeId`

Get salary structure for an employee.

#### `POST /api/payroll/generate`

Generate payroll for an employee.

Body example:

```json
{
  "employeeId": "<employeeObjectId>",
  "month": 5,
  "year": 2026
}
```

#### `GET /api/payroll/employee/:employeeId`

Get all payslips for an employee.

#### `GET /api/payroll/:payslipId`

Get a payslip by ID.

## Roles

- `ADMIN` — onboard admins and HR, manage departments, view employees, deactivate profiles, manage salary structures, and generate payroll.
- `HRM` — onboard employees, view departments, attendance, and leaves, and access payroll read endpoints.
- `STAFF` — clock in/out, request and cancel leaves, and view own payslips.

## Notes

- The project uses invite-based onboarding. Invited users complete `/api/v1/auth/setup-account` before signing in.
- Protect requests with the JWT returned from `/api/v1/auth/sign-in`.
- Validation errors typically return `success: false` and an `error` object.
- The root endpoint `GET /` returns a welcome message.
