import express from 'express';
import { check } from 'express-validator';

// Import controllers (to be implemented later)
import { 
  createLoanApplication,
  getAllLoanApplications,
  getLoanApplicationById,
  updateLoanApplication,
  uploadDocument,
  getDocuments
} from '../controllers/loanController';

// Import middleware (to be implemented later)
import { authenticate } from '../middleware/authenticate';
import { validateRequest } from '../middleware/validateRequest';
import { checkRole } from '../middleware/checkRole';

const router = express.Router();

/**
 * @route   POST /api/loans/apply
 * @desc    Create a new loan application
 * @access  Private
 */
router.post(
  '/apply',
  authenticate,
  [
    check('loanAmount', 'Loan amount is required').isNumeric(),
    check('loanPurpose', 'Loan purpose is required').notEmpty(),
    check('loanTerm', 'Loan term is required').isNumeric(),
    check('businessName', 'Business name is required').notEmpty(),
    check('businessAddress', 'Business address is required').notEmpty(),
    check('businessType', 'Business type is required').notEmpty(),
  ],
  validateRequest,
  createLoanApplication
);

/**
 * @route   GET /api/loans
 * @desc    Get all loan applications (admin only)
 * @access  Private/Admin
 */
router.get(
  '/',
  authenticate,
  checkRole(['admin']),
  getAllLoanApplications
);

/**
 * @route   GET /api/loans/:id
 * @desc    Get loan application by ID
 * @access  Private
 */
router.get(
  '/:id',
  authenticate,
  getLoanApplicationById
);

/**
 * @route   PUT /api/loans/:id
 * @desc    Update loan application status (admin only)
 * @access  Private/Admin
 */
router.put(
  '/:id',
  authenticate,
  checkRole(['admin']),
  [
    check('status', 'Status is required').isIn([
      'pending',
      'under_review',
      'approved',
      'rejected',
      'funded'
    ]),
    check('notes', 'Notes must be a string').optional().isString(),
  ],
  validateRequest,
  updateLoanApplication
);

/**
 * @route   POST /api/loans/:id/documents
 * @desc    Upload document for a loan application
 * @access  Private
 */
router.post(
  '/:id/documents',
  authenticate,
  uploadDocument
);

/**
 * @route   GET /api/loans/:id/documents
 * @desc    Get all documents for a loan application
 * @access  Private
 */
router.get(
  '/:id/documents',
  authenticate,
  getDocuments
);

export default router; 