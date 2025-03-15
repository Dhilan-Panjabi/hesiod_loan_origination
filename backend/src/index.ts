import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import 'dotenv/config';

import { errorHandler } from './middleware/errorHandler';
import { routeNotFound } from './middleware/routeNotFound';
import userRoutes from './routes/userRoutes';
import loanRoutes from './routes/loanRoutes';

// Initialize express app
const app = express();
const port = process.env.PORT || 8000;

// Middleware
app.use(helmet()); // Security headers
app.use(compression()); // Compress responses
app.use(morgan('dev')); // Logging
app.use(cors()); // CORS
app.use(express.json()); // Parse JSON request body
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request body

// Routes
app.use('/api/users', userRoutes);
app.use('/api/loans', loanRoutes);

// Base route
app.get('/', (req, res) => {
  res.json({
    message: 'Hesiod Loan Origination API',
    version: '0.1.0',
    status: 'OK',
  });
});

// Error handlers
app.use(routeNotFound);
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app; 