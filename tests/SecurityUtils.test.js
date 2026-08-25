import { describe, it, expect } from 'vitest';
import { sanitizeInput, validateImageFile } from '../src/utils/security';

describe('Security Utilities Root Test Suite', () => {
  it('sanitizeInput should escape HTML tags and malicious script payloads', () => {
    const maliciousScript = '<script>alert("xss")</script>';
    const sanitized = sanitizeInput(maliciousScript);
    expect(sanitized).not.toContain('<script>');
    expect(sanitized).toContain('&lt;script&gt;');
  });

  it('sanitizeInput should strip javascript: pseudo-protocol', () => {
    const maliciousUrl = 'javascript:alert(1)';
    const sanitized = sanitizeInput(maliciousUrl);
    expect(sanitized).not.toContain('javascript:');
  });

  it('validateImageFile should reject non-image file types', () => {
    const fakeFile = new File(['dummy content'], 'document.pdf', { type: 'application/pdf' });
    const result = validateImageFile(fakeFile);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('Invalid file format');
  });

  it('validateImageFile should reject files exceeding 5MB limit', () => {
    const largeContent = new ArrayBuffer(6 * 1024 * 1024);
    const largeFile = new File([largeContent], 'heavy.jpg', { type: 'image/jpeg' });
    const result = validateImageFile(largeFile);
    expect(result.valid).toBe(false);
    expect(result.error).toContain('exceeds the 5MB');
  });

  it('validateImageFile should accept valid JPEG images under 5MB', () => {
    const validContent = new ArrayBuffer(1024 * 1024);
    const validFile = new File([validContent], 'photo.jpg', { type: 'image/jpeg' });
    const result = validateImageFile(validFile);
    expect(result.valid).toBe(true);
  });
});
