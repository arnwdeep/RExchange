/**
 * RExchange Security Utility Module
 * Enforces strict XSS sanitization, safe file input validation, and CSP security rules.
 */

/**
 * Sanitizes input text to prevent XSS (Cross-Site Scripting) attacks
 * @param {string} input - User-provided input string
 * @returns {string} Sanitized clean string
 */
export function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/javascript:/gi, '')
    .replace(/data:/gi, 'data_sanitized:')
    .trim();
}

/**
 * Validates uploaded student item photos for file format, size limit, and MIME security
 * @param {File} file - File object from HTML file input
 * @returns {{ valid: boolean, error?: string }} Security validation result
 */
export function validateImageFile(file) {
  if (!file) {
    return { valid: false, error: 'No file provided' };
  }

  const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
  const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB Limit

  if (!ALLOWED_MIME_TYPES.includes(file.type.toLowerCase())) {
    return {
      valid: false,
      error: 'Invalid file format. Only JPEG, PNG, and WEBP studio images are permitted.'
    };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: 'File size exceeds the 5MB campus upload limit.'
    };
  }

  return { valid: true };
}

/**
 * Standard Security Headers Config for HTTP Responses & Meta Tags
 */
export const SECURITY_HEADERS = {
  'Content-Security-Policy': "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com;",
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin'
};
