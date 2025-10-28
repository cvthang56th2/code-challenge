# 99Tech Code Challenge Solutions

A comprehensive solution repository for the 99Tech Code Challenge, featuring interactive demonstrations and detailed implementations across multiple programming problems.

## 🚀 Live Demo

Visit the deployed application: **[https://cvthang56th2.github.io/code-challenge/](https://cvthang56th2.github.io/code-challenge/)**

## 📋 Problems Solved

### Problem 1: Sum to N Implementations
**Location:** `src/problem1/solution.js`

Three different approaches to calculate the sum of numbers from 1 to n:
- **Mathematical Formula** - O(1) time complexity using `n*(n+1)/2`
- **Iterative Approach** - O(n) time complexity with for loop
- **Recursive Approach** - O(n) time complexity with recursion

### Problem 2: Currency Swap Interface
**Location:** `src/problem2/` (React + TypeScript + Vite)

Interactive cryptocurrency exchange interface featuring:
- Real-time currency conversion
- Token selection with search functionality
- Responsive design with modern UI components
- TypeScript for type safety
- Built with React 18 and Vite

### Problem 3: Code Analysis & Refactoring
**Location:** `src/problem3/`

Comprehensive analysis and refactoring of React TypeScript code:
- **Original Code:** `original-code.tsx` - Code with multiple issues
- **Refactored Code:** `refactored-code.tsx` - Optimized and fixed version

**Issues Identified & Fixed:**
- Critical type safety problems
- Performance inefficiencies and unnecessary re-renders
- Logic errors and anti-patterns
- React best practices violations
- Memory leaks and resource management
- Accessibility improvements

## 🛠️ Technology Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** CSS3, Modern UI components
- **Build Tools:** Vite, ESLint, TypeScript compiler
- **Deployment:** GitHub Pages with automated CI/CD

## 🏃‍♂️ Quick Start

### View All Solutions (Recommended)
The interactive React application showcases all problems:

```bash
cd src/problem2
npm install
npm run dev
```

Visit `http://localhost:5173/code-challenge/` to explore all solutions interactively.

### Individual Problem Solutions

**Problem 1 (JavaScript):**
```bash
node src/problem1/solution.js
```

**Problem 3 Analysis:**
Review the files in `src/problem3/` for detailed code analysis and refactoring examples.

## 📁 Project Structure

```
src/
├── problem1/           # JavaScript implementations
│   └── solution.js
├── problem2/           # React application (main showcase)
│   ├── src/
│   │   ├── components/ # React components for all problems
│   │   ├── types/      # TypeScript type definitions
│   │   └── utils/      # Utility functions and API calls
│   └── README.md       # Detailed React app documentation
├── problem3/           # Code analysis examples
│   ├── original-code.tsx
│   └── refactored-code.tsx
├── problem4/           # Reserved for future solutions
└── problem5/           # Reserved for future solutions
```

## 🚀 Deployment

This project is automatically deployed to GitHub Pages using GitHub Actions. See [`DEPLOYMENT.md`](DEPLOYMENT.md) for detailed deployment information.

**Deployment Features:**
- Automatic deployment on push to main branch
- Manual deployment trigger available
- Optimized build process with Vite
- Custom base path configuration for GitHub Pages

## 💡 Key Features

- **Interactive Demonstrations:** All solutions are showcased in a user-friendly React interface
- **Multiple Implementation Approaches:** Different algorithms and patterns demonstrated
- **Type Safety:** Full TypeScript implementation with strict type checking
- **Performance Optimized:** Efficient algorithms and React best practices
- **Responsive Design:** Works seamlessly across desktop and mobile devices
- **Modern Development Stack:** Latest tools and frameworks

## 📝 Submission Notes

This repository demonstrates practical problem-solving skills across different domains:
- **Algorithmic Thinking:** Multiple approaches to mathematical problems
- **Frontend Development:** Modern React application with TypeScript
- **Code Quality:** Refactoring and optimization techniques
- **DevOps:** Automated deployment and CI/CD setup

All solutions are production-ready and follow industry best practices.
