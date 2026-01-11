# Contributing to Audiomack API

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community

## How to Contribute

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Environment details** (OS, Bun version, etc.)
- **Code samples** if applicable

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title and description**
- **Use case and rationale**
- **Possible implementation** (if you have ideas)

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes**
4. **Test your changes** thoroughly
5. **Commit with clear messages** (`git commit -m 'Add amazing feature'`)
6. **Push to your branch** (`git push origin feature/amazing-feature`)
7. **Open a Pull Request**

#### Pull Request Guidelines

- Follow the existing code style
- Update documentation as needed
- Add tests for new features
- Ensure all tests pass
- Keep commits focused and atomic
- Write clear commit messages

## Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/audiomack-api.git
cd audiomack-api

# Install dependencies
bun install

# Copy environment variables
cp .env.example .env

# Start development server
bun run dev
```

## Code Style

- Use TypeScript
- Follow existing formatting
- Use meaningful variable names
- Add comments for complex logic
- Keep functions focused and small

## Testing

Before submitting a PR:

```bash
# Run the development server
bun run dev

# Test all endpoints manually
# Ensure no errors in console
```

## Project Structure

```
src/
├── search/          # Search functionality
├── albums/          # Album endpoints
├── artists/         # Artist endpoints
├── playlists/       # Playlist endpoints
├── recommendations/ # Recommendations
├── resolve/         # URL resolver
├── utils/           # Shared utilities
└── index.ts         # Main entry point
```

## Commit Message Format

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples:**

```
feat(search): add pagination support
fix(oauth): correct signature generation
docs(readme): update installation steps
```

## Questions?

Feel free to open an issue for any questions or clarifications.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
