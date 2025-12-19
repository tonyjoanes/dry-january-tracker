/**
 * Validation utilities for user inputs
 */

/**
 * Validates password strength and complexity
 * @param password - The password to validate
 * @returns Error message if invalid, null if valid
 */
export const validatePassword = (password: string): string | null => {
  if (password.length < 8) {
    return 'Password must be at least 8 characters';
  }
  if (!/[a-z]/.test(password)) {
    return 'Password must contain at least one lowercase letter';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }
  if (!/[0-9]/.test(password)) {
    return 'Password must contain at least one number';
  }
  if (!/[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\\/]/.test(password)) {
    return 'Password must contain at least one special character';
  }

  // Check against common passwords
  const commonPasswords = [
    'password',
    'password123',
    '12345678',
    'qwerty123',
    'abc123456',
    'password1',
    'letmein123',
  ];
  if (commonPasswords.includes(password.toLowerCase())) {
    return 'Password is too common. Please choose a stronger password';
  }

  return null;
};

/**
 * Sanitizes text input by removing HTML tags and limiting length
 * @param input - The input string to sanitize
 * @param maxLength - Maximum allowed length
 * @returns Sanitized string
 */
export const sanitizeTextInput = (input: string, maxLength: number): string => {
  // Remove HTML tags
  const stripped = input.replace(/<[^>]*>/g, '');
  // Remove script tags and their content
  const noScripts = stripped.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  // Limit length
  const truncated = noScripts.substring(0, maxLength);
  // Trim whitespace
  return truncated.trim();
};

/**
 * Validates numeric input within a range
 * @param value - The numeric value to validate
 * @param min - Minimum allowed value
 * @param max - Maximum allowed value
 * @param fieldName - Name of the field for error messages
 * @returns Error message if invalid, null if valid
 */
export const validateNumericInput = (
  value: number,
  min: number,
  max: number,
  fieldName: string
): string | null => {
  if (isNaN(value)) {
    return `${fieldName} must be a valid number`;
  }
  if (value < min) {
    return `${fieldName} must be at least ${min}`;
  }
  if (value > max) {
    return `${fieldName} must be at most ${max}`;
  }
  return null;
};

/**
 * Validates email format
 * @param email - The email to validate
 * @returns True if valid, false otherwise
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Maps Firebase error codes to user-friendly messages
 * @param error - The Firebase error object
 * @returns User-friendly error message
 */
export const getFirebaseErrorMessage = (error: any): string => {
  const errorCode = error?.code || '';

  switch (errorCode) {
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Invalid email or password';
    case 'auth/email-already-in-use':
      return 'An account with this email already exists';
    case 'auth/weak-password':
      return 'Password is too weak. Please choose a stronger password';
    case 'auth/invalid-email':
      return 'Invalid email address';
    case 'auth/too-many-requests':
      return 'Too many failed attempts. Please try again later';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection';
    case 'auth/user-disabled':
      return 'This account has been disabled';
    case 'auth/operation-not-allowed':
      return 'This operation is not allowed';
    case 'auth/requires-recent-login':
      return 'Please sign in again to continue';
    case 'permission-denied':
      return 'You do not have permission to perform this action';
    case 'unavailable':
      return 'Service temporarily unavailable. Please try again';
    default:
      // Log the actual error for debugging but show generic message to user
      console.error('Firebase error:', errorCode, error);
      return 'An error occurred. Please try again';
  }
};
