//middleare to check registration form validation
import { body, validationResult } from 'express-validator';

const validateRegistration = async (req, res, next) => {
  const rules = [
    body('name')
      .notEmpty()
      .withMessage('Name is required'),
    
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .withMessage('Invalid email format'),
    
    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long'),
   
  ];

  await Promise.all(rules.map(rule => rule.run(req)));

  const validationErrors = validationResult(req);

  if (!validationErrors.isEmpty()) {
    return res.render('register', { errorMessage: validationErrors.array()[0].msg });
  }

  next();
};

export default validateRegistration;
