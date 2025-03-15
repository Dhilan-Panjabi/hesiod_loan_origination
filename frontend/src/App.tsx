import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Placeholder components - these will be replaced with actual components later
const Home = () => <div className="p-4">Home Page</div>;
const Dashboard = () => <div className="p-4">Dashboard Page</div>;
const LoanApplication = () => <div className="p-4">Loan Application Page</div>;
const NotFound = () => <div className="p-4">404 - Page Not Found</div>;

function App() {
  return (
    <div className="App">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-2xl font-bold">Hesiod Loan Origination</h1>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/apply" element={<LoanApplication />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <footer className="bg-gray-200 p-4 text-center">
        <p>&copy; {new Date().getFullYear()} Hesiod Loan Origination</p>
      </footer>
    </div>
  );
}

export default App; 