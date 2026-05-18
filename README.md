# Team Task Management Hub

A small full-stack task management application built with React + TypeScript on the frontend and Node.js + Express + TypeScript on the backend.

## Tech Stack

- Frontend: React, TypeScript, Vite, Zustand, zod
- Backend: Node.js, Express, TypeScript, zod
- Persistence: In-memory store (no database)

## Features

- RESTful Task API with consistent response envelope
- Backend error handling for validation and unknown routes
- React dashboard with reusable components
- Client and server validation via zod
- Protected delete endpoint requiring `x-task-admin-token`

## Folder Layout

```text
team-task-management-hub/
  client/
  server/
```

## Run Locally

1. Install dependencies:

```bash
cd team-task-management-hub
cd client
npm install
```

```bash
cd team-task-management-hub
cd server
npm install
```

2. Start both frontend and backend:

```bash
cd client
npm run dev
```

```bash
cd server
npm run dev
```

3. Open frontend:

```text
http://localhost:5174
```

Backend API runs at:

```text
http://localhost:5000
```

## Environment Variables

Create these optional env files:

- `server/.env`:

```env
DELETE_TASK_TOKEN=team-task-secret
```

- `client/.env`:

```env
VITE_DELETE_TASK_TOKEN=team-task-secret
```

Both tokens should match so delete requests are authorized.
