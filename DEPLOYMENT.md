# GitHub Pages Deployment

This repository is configured to automatically deploy the `src/problem2` application to GitHub Pages using GitHub Actions.

## Deployment Setup

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings**
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select **GitHub Actions**

### 2. Automatic Deployment

The deployment will automatically trigger when:
- You push changes to the `main` branch that affect files in `src/problem2/`
- You manually trigger the workflow from the Actions tab

### 3. Access Your Deployed App

Once deployed, your app will be available at:
```
https://cvthang56th2.github.io/code-challenge/
```

## Manual Deployment

You can also manually trigger a deployment:

1. Go to the **Actions** tab in your repository
2. Select the "Deploy to GitHub Pages" workflow
3. Click **Run workflow**
4. Click the green **Run workflow** button

## Local Development

To run the project locally:

```bash
cd src/problem2
npm install
npm run dev
```

## Build Process

The GitHub Action will:
1. Checkout the code
2. Set up Node.js 20
3. Install dependencies with `npm ci`
4. Build the project with `npm run build`
5. Deploy the `dist` folder to GitHub Pages

## Configuration

- **Base Path**: The app is configured with base path `/code-challenge/` in `vite.config.ts`
- **Build Output**: The build outputs to `src/problem2/dist/`
- **Node Version**: GitHub Actions uses Node.js 20