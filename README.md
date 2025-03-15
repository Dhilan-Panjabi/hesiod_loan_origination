# Hesiod Loan Origination Platform

A fullstack web application for loan origination processes.

## Project Structure

```
hesiod_loan_origination/
├── frontend/                # React TypeScript frontend
│   ├── public/              # Static files
│   ├── src/                 # Source code
│   │   ├── assets/          # Images, fonts, etc.
│   │   ├── components/      # Reusable components
│   │   ├── context/         # React context providers
│   │   ├── hooks/           # Custom React hooks
│   │   ├── pages/           # Application pages
│   │   ├── services/        # API services
│   │   ├── types/           # TypeScript type definitions
│   │   ├── utils/           # Helper functions
│   │   ├── App.tsx          # Main component
│   │   └── index.tsx        # Entry point
│   ├── package.json         # Frontend dependencies
│   └── tsconfig.json        # TypeScript configuration
│
├── backend/                 # Node.js Express backend
│   ├── src/                 # Source code
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Express middleware
│   │   ├── models/          # Data models
│   │   ├── routes/          # API routes
│   │   ├── services/        # Business logic
│   │   ├── types/           # TypeScript type definitions
│   │   ├── utils/           # Helper functions
│   │   └── index.ts         # Entry point
│   ├── package.json         # Backend dependencies
│   └── tsconfig.json        # TypeScript configuration
│
├── .env.example             # Example environment variables
├── .gitignore               # Git ignore file
└── .cursor                  # Cursor editor configuration
```

## Technology Stack

### Frontend
- React
- TypeScript
- React Router
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express
- TypeScript
- Supabase (PostgreSQL)

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Supabase account and project

### Installation

1. Clone the repository
   ```
   git clone <repository-url>
   cd hesiod_loan_origination
   ```

2. Setup Frontend
   ```
   cd frontend
   npm install
   npm start
   ```

3. Setup Backend
   ```
   cd backend
   npm install
   npm run dev
   ```

4. Environment Variables
   - Copy `.env.example` to `.env` in both frontend and backend directories
   - Update the environment variables with your Supabase credentials

## Features

- User authentication via Supabase
- Loan application submission and management
- Document upload and verification
- Loan status tracking
- Admin dashboard for loan approval workflow

## Development

- Frontend runs on http://localhost:3000
- Backend API runs on http://localhost:8000 