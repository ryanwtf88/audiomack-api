# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability within this project, please send an email to the maintainer. All security vulnerabilities will be promptly addressed.

**Please do not open public issues for security vulnerabilities.**

### What to Include

When reporting a vulnerability, please include:

- Description of the vulnerability
- Steps to reproduce the issue
- Potential impact
- Suggested fix (if any)

### Response Timeline

- **Initial Response:** Within 48 hours
- **Status Update:** Within 7 days
- **Fix Timeline:** Varies based on severity

## Security Best Practices

When using this API:

1. **Environment Variables:** Always use environment variables for sensitive credentials
2. **Rate Limiting:** Implement rate limiting in production
3. **HTTPS Only:** Always use HTTPS in production environments
4. **Input Validation:** Validate all user inputs before processing
5. **Dependencies:** Keep dependencies up to date

## Known Limitations

- This API uses public OAuth credentials for Audiomack
- Some content may be geo-restricted or require premium access
- Rate limiting may apply based on Audiomack's policies

## Disclaimer

This is an unofficial API wrapper. Use at your own risk. The maintainers are not responsible for any misuse or violations of Audiomack's Terms of Service.
