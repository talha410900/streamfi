// Validation schemas using Zod (simple mock since no integrations)
// In production, import from 'zod' and use full validation

export interface ValidationError {
  field: string;
  message: string;
}

export function validateEmail(email: string): ValidationError | null {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return { field: 'email', message: 'Invalid email address' };
  }
  return null;
}

export function validatePassword(password: string): ValidationError | null {
  if (!password || password.length < 8) {
    return { field: 'password', message: 'Password must be at least 8 characters' };
  }
  return null;
}

export function validateLoginForm(email: string, password: string): ValidationError[] {
  const errors: ValidationError[] = [];
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);
  if (emailError) errors.push(emailError);
  if (passwordError) errors.push(passwordError);
  return errors;
}

export function validateSignupForm(
  email: string,
  password: string,
  confirmPassword: string,
): ValidationError[] {
  const errors: ValidationError[] = [];
  const emailError = validateEmail(email);
  const passwordError = validatePassword(password);
  if (emailError) errors.push(emailError);
  if (passwordError) errors.push(passwordError);
  if (password !== confirmPassword) {
    errors.push({ field: 'confirmPassword', message: 'Passwords do not match' });
  }
  return errors;
}

export function validateDealForm(dealData: {
  title?: string;
  description?: string;
  raise_target?: number;
  valuation?: number;
}): ValidationError[] {
  const errors: ValidationError[] = [];
  if (!dealData.title) {
    errors.push({ field: 'title', message: 'Deal title is required' });
  }
  if (!dealData.description) {
    errors.push({ field: 'description', message: 'Deal description is required' });
  }
  if (!dealData.raise_target || dealData.raise_target <= 0) {
    errors.push({ field: 'raise_target', message: 'Raise target must be greater than 0' });
  }
  if (!dealData.valuation || dealData.valuation <= 0) {
    errors.push({ field: 'valuation', message: 'Valuation must be greater than 0' });
  }
  return errors;
}

export function validateKYCForm(kycData: {
  legal_name?: string;
  date_of_birth?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
}): ValidationError[] {
  const errors: ValidationError[] = [];
  if (!kycData.legal_name) {
    errors.push({ field: 'legal_name', message: 'Legal name is required' });
  }
  if (!kycData.date_of_birth) {
    errors.push({ field: 'date_of_birth', message: 'Date of birth is required' });
  }
  if (!kycData.address) {
    errors.push({ field: 'address', message: 'Address is required' });
  }
  if (!kycData.city) {
    errors.push({ field: 'city', message: 'City is required' });
  }
  if (!kycData.state) {
    errors.push({ field: 'state', message: 'State is required' });
  }
  if (!kycData.zip) {
    errors.push({ field: 'zip', message: 'ZIP code is required' });
  }
  return errors;
}
