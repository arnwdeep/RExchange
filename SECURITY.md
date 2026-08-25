# RExchange Security Policy

## 🔒 Security Commitments

At **REXCHANGE®**, student data protection, credential safety, and secure peer transactions are built into every layer of our application.

## 🛡️ Security Audit & Control Measures

1. **XSS Protection**: All user input strings, chat messages, search queries, and custom item listings are escaped and sanitized via `src/utils/security.js`.
2. **File Upload Security**: Student item photos are restricted to JPEG, PNG, and WEBP formats with a maximum file size cap of 5MB. Executable code payloads and SVG script execution are strictly prohibited.
3. **HTTP Content Security Policy (CSP)**: `vercel.json` and `index.html` enforce strict Content-Security-Policy rules (`default-src 'self' data: https:`), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, and `Referrer-Policy: strict-origin-when-cross-origin`.
4. **Zero Secret Leaks**: No credentials, private API keys, or tokens are committed to source control.

## 📬 Reporting Vulnerabilities

If you discover a security vulnerability within RExchange, please submit a report to `modakarnadeep@gmail.com`. All security reports will be investigated within 24 hours.
