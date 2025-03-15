import express from 'express';
import { check } from 'express-validator';

// Import controllers (to be implemented later)
import { 
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  resetPassword
} from '../controllers/userController';

// Import middleware (to be implemented later)
import { authenticate } from '../middleware/authenticate';
import { validateRequest } from '../middleware/validateRequest';

const router = express.Router();

/**
 * @route   POST /api/users/register
 * @desc    Register a new user
 * @access  Public
 */
router.post(
  '/register',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
    check('firstName', 'First name is required').notEmpty(),
    check('lastName', 'Last name is required').notEmpty(),
  ],
  validateRequest,
  registerUser
);

/**
 * @route   POST /api/users/login
 * @desc    Login user and get token
 * @access  Public
 */
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  validateRequest,
  loginUser
);

/**
 * @route   GET /api/users/profile
 * @desc    Get user profile
 * @access  Private
 */
router.get('/profile', authenticate, getUserProfile);

/**
 * @route   PUT /api/users/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put(
  '/profile',
  authenticate,
  [
    check('firstName', 'First name is required').optional(),
    check('lastName', 'Last name is required').optional(),
    check('phone', 'Phone number is not valid').optional().isMobilePhone('any'),
  ],
  validateRequest,
  updateUserProfile
);

/**
 * @route   POST /api/users/reset-password
 * @desc    Reset user password
 * @access  Public
 */
router.post(
  '/reset-password',
  [
    check('email', 'Please include a valid email').isEmail(),
  ],
  validateRequest,
  resetPassword
);

export default router; 