# Contributing to Animekun-Frontend

Thank you for considering contributing to this project! We value every contribution, no matter how big or small. Your efforts help make this project better for everyone.

## Table of Contents

- [What We're Looking For](#what-were-looking-for)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Submitting Your Contribution](#submitting-your-contribution)
- [Code Standards](#code-standards)

## What We're Looking For

We welcome all types of contributions including:

- Bug fixes and issue resolution
- New features and enhancements
- Documentation updates and corrections
- Code optimization and refactoring
- Answering questions and helping other contributors

## Getting Started

Before diving in, please:

- Check existing [issues](hhttps://github.com/Subhajeetch/Animekun-frontend/issues) and [pull requests](https://github.com/Subhajeetch/Animekun-frontend/pulls) to avoid duplicate work
- Read through the project documentation to understand the codebase
- Be respectful and constructive in all interactions

### When to Open an Issue vs Pull Request

- **Small changes** (typos, bug fixes, minor improvements): Feel free to open a pull request directly
- **Large changes** (new features, major refactors, breaking changes): Open an issue first to discuss your approach and get feedback

## Development Setup

### Requirements

- Next.js (version 16.x or higher)
- Git for version control

### Installation Steps

1. Fork the [repository](https://github.com/Subhajeetch/Animekun-frontend/fork) to your GitHub account

2. Clone your forked repository:

```bash
git clone https://github.com/<your_username>/Animekun-frontend
cd Animekun-frontend
```

3. Install dependencies:

```bash
npm install
```

4. Create a new branch for your work:

```bash
git checkout -b type/descriptive-name
```

Branch naming conventions:
- `feature/feature-name` for new features
- `fix/issue-description` for bug fixes
- `docs/update-description` for documentation
- `refactor/component-name` for code refactoring

## Making Changes

### Running the Development Server

```bash
npm run dev
```

### Building the Project

```bash
npm run build
```

### Project Organization

```
.
├── app/                 # Next.js App Router (pages, layouts, routes)
├── AuthStore/           # Authentication state/store logic
├── components/          # Reusable UI components
├── context/             # React context providers
├── DataRoutes/          # API/data route handlers
├── docs/                # Project documentations
├── public/              # Static assets (images, icons, fonts)
├── Sections/            # Page sections / layout blocks
├── Styles/              # Global and custom styles
├── Utils/               # Utility/helper functions
│
├── .env.local           # Environment variables

```

## Submitting Your Contribution

1. Ensure your code follows the project's style guidelines

2. Update documentation if you've changed functionality

3. Commit your changes using clear, descriptive commit messages (see format below)

4. Push to your fork:

```bash
git push origin your-branch-name
```

6. Open a pull request with:
   - A clear title describing the change
   - A detailed description of what you've done
   - References to related issues (e.g., "Fixes #123")
   - Screenshots for UI changes (if applicable)

## Code Standards

### Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): brief description

[optional body]
[optional footer]
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, semicolons, etc.)
- `refactor` - Code refactoring without changing functionality
- `test` - Adding or updating tests
- `chore` - Maintenance tasks, dependency updates

**Examples:**
- `feat: add dark mode toggle`
- `fix: resolve login redirect issue`
- `docs: update installation instructions`
- `refactor: simplify authentication logic`

### Code Style

- Use meaningful variable and function names
- Write comments for complex logic
- Keep functions small and focused
- Follow existing code patterns in the project

---

Thank you for contributing! If you have questions, feel free to ask in the issues or discussions section.
