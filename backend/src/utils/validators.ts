const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i;

export const isValidEmail = (value: unknown): value is string => {
  if (typeof value !== "string") {
    return false;
  }

  const email = value.trim();
  if (!email) {
    return false;
  }

  return EMAIL_REGEX.test(email);
};

export const isValidPassword = (value: unknown): value is string => {
  if (typeof value !== "string") {
    return false;
  }

  const password = value.trim();
  if (password.length < 8) {
    return false;
  }

  // Require at least one letter and one number
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /\d/.test(password);

  return hasLetter && hasNumber;
};

export const sanitizeString = (value: unknown): string | undefined => {
  if (typeof value !== "string") {
    return undefined;
  }

  const sanitized = value.trim();
  return sanitized || undefined;
};
