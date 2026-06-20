# 🚀 IntroConnect: Fullstack Deployment & CI/CD Guide (Vercel + MongoDB Atlas)

This guide provides a comprehensive walkthrough for configuring, connecting, and deploying both the **Express Backend** and **React Frontend** of IntroConnect using Vercel and MongoDB Atlas.

---

## 📖 Table of Contents
1. [Core Concepts](#-core-concepts)
2. [Prerequisite 1: MongoDB Atlas Cloud Setup](#-prerequisite-1-mongodb-atlas-cloud-setup)
3. [Prerequisite 2: Git Repository Initialization](#-prerequisite-2-git-repository-initialization)
4. [Step-by-Step Deployment Walkthrough](#-step-by-step-deployment-walkthrough)
   - [Step A: Deploying the Backend](#step-a-deploying-the-backend)
   - [Step B: Configuring the Frontend Rewrite Proxy](#step-b-configuring-the-frontend-rewrite-proxy)
   - [Step C: Deploying the Frontend](#step-c-deploying-the-frontend)
5. [Local Development vs. Production](#-local-development-vs-production)
6. [CI/CD & Git Integration Overview](#-cicd--git-integration-overview)
7. [Reference Configuration Files](#-reference-configuration-files)

---

## 🧠 Core Concepts

### 1. Monorepos
IntroConnect is structured as a monorepo. It contains two isolated packages inside one Git repository:
* `/frontend`: The user interface built with React, Vite, TailwindCSS, and DaisyUI.
* `/backend`: The API server built with Node.js, Express, and Mongoose.

### 2. Serverless Execution on Vercel
Traditionally, Express servers run 24/7 listening on a specific port. On Vercel, servers are converted into **Serverless Functions**. 
* Instead of running continuously, Vercel starts your Express app only when a request hits your endpoint, responds, and then turns off.
* To support this, `backend/src/server.js` was modified to export the `app` instance (`export default app`) and skip standard `app.listen()` when deployed in production under Vercel.

### 3. Edge Rewrite Proxy (CORS & Cookie Bypass)
Your app uses JSON Web Tokens (JWT) stored in HTTP-Only cookies. Browsers block sharing cookies across different domains (e.g., from `intro-frontend.vercel.app` to `intro-backend.vercel.app`).
* We solve this by adding a proxy rewrite in `frontend/vercel.json`.
* Every API call from the React frontend goes to the relative path `/api/...` (the same domain).
* Vercel’s Edge routing redirects it to the backend deployment automatically. 
* Result: CORS is bypassed natively and cookies are sent securely.

---

## 🗄️ Prerequisite 1: MongoDB Atlas Cloud Setup

Because local database connections (`mongodb://127.0.0.1:27017`) cannot be reached by cloud instances, you must set up a MongoDB Atlas cluster.

1. **Sign Up**: Register a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).
2. **Create Cluster**: Select the **M0 (Free)** tier, choose a provider (e.g. AWS), and select a region close to your target audience.
3. **Database User Credentials**:
   - Create a database user (e.g., `dbUser`).
   - Generate a secure password and save it somewhere safe.
   - Click **Create Database User**.
4. **Configure IP Whitelisting (Important)**:
   - Go to **Network Access** under the **Security** sidebar.
   - Click **Add IP Address**.
   - Click **Allow Access From Anywhere** (which inserts `0.0.0.0/0`).
   - Click **Confirm**.
   > [!IMPORTANT]
   > You must whitelist `0.0.0.0/0` because Vercel uses dynamic Serverless IP addresses that change on every request. Whitelisting only your own local IP will cause your Vercel deployments to throw connection timeout errors.
5. **Get Connection String**:
   - Go to the **Database Overview** screen.
   - Click **Connect** > select **Drivers**.
   - Copy the connection string. It will look like this:
     `mongodb+srv://dbUser:<db_password>@cluster0.xxxx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
6. **Format the URI**:
   - Replace `<db_password>` with your database user's password.
   - Add your database name (e.g., `IntroCopy`) right before the `?` character:
     `...mongodb.net/IntroCopy?retryWrites=true...`

---

## 💻 Prerequisite 2: Git Repository Initialization

Vercel deploys directly from your Git hosting provider (GitHub, GitLab, or Bitbucket) to power its CI/CD system. Push your local workspace using these commands:

```bash
git init
git add .
git commit -m "Configure monorepo Vercel serverless integration"
git branch -M main
git remote add origin <YOUR_REMOTE_GIT_REPOSITORY_URL>
git push -u origin main
```

---

## 🚀 Step-by-Step Deployment Walkthrough

### Step A: Deploying the Backend
1. Open the [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New** > **Project** and import your Git repository.
3. In the configuration:
   - **Project Name**: `intro-connect-backend` (or a name of your choice)
   - **Framework Preset**: Select **Other**
   - **Root Directory**: Select **`backend`**
4. Expand **Environment Variables** and add the following keys:
   - `MONGO_URI` (Your formatted MongoDB Atlas cloud connection string)
   - `STEAM_API_KEY` (Your GetStream Client API key)
   - `STEAM_API_SECRET` (Your GetStream Client secret)
   - `JWT_SECRET_KEY` (A secure random string for JWT hashing)
   - `NODE_ENV` (Set to `production`)
5. Click **Deploy**.
6. When deployment finishes, copy the deployment domain URL (e.g., `https://intro-connect-backend.vercel.app`).

---

### Step B: Configuring the Frontend Rewrite Proxy
1. In your local project, open `frontend/vercel.json`.
2. Locate the `/api/:path*` rewrite route and replace the placeholder destination URL with your copied Vercel backend URL:
   ```json
   {
     "cleanUrls": true,
     "rewrites": [
       {
         "source": "/api/:path*",
         "destination": "https://intro-connect-backend.vercel.app/api/:path*"
       },
       {
         "source": "/((?!api|assets|favicon.ico|logo.png|.*\\.).*)",
         "destination": "/index.html"
       }
     ]
   }
   ```
3. Commit and push this change to GitHub:
   ```bash
   git add frontend/vercel.json
   git commit -m "Configure production Edge Rewrite destination URL"
   git push origin main
   ```

---

### Step C: Deploying the Frontend
1. Return to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click **Add New** > **Project** and import the same repository.
3. In the configuration:
   - **Project Name**: `intro-connect-frontend`
   - **Framework Preset**: Select **Vite** (Vercel will auto-detect this)
   - **Root Directory**: Select **`frontend`**
4. Expand **Environment Variables** and add your client key:
   - `VITE_STREAM_API_KEY` (Your GetStream Client API key)
5. Click **Deploy**. Your live React frontend domain is now fully connected to your serverless Express API!

---

## ⚙️ Local Development vs. Production

To run the application locally:
* **Backend**: Run `npm run dev` inside `/backend` (runs Nodemon on `http://localhost:5001`). It will read parameters from your local `backend/.env` file. Keep your local `MONGO_URI` set to `mongodb://127.0.0.1:27017/IntroCopy` to separate development test data from production.
* **Frontend**: Run `npm run dev` inside `/frontend` (runs Vite on `http://localhost:5173`). It routes requests to the local port via proxies set in Vite config.

To update production:
* Push commits to your default Git branch. Vercel automatically deploys the changes.

---

## ⚡ CI/CD & Git Integration Overview

Vercel provides automated Continuous Integration and Continuous Deployment (CI/CD):
* **Production Deployments**: Every git push to your default branch (e.g. `main`) automatically starts a production build.
* **Preview Deployments**: Pushing to other branches (e.g. `feature/design-updates`) creates temporary staging links where you can inspect your changes safely.
* **Instant Rollbacks**: If your code has a runtime bug in production, go to your Vercel Dashboard, select your project, and click **Rollback** on a previous stable deployment. It reverts in under a second.

---

## 📁 Reference Configuration Files

### 1. `backend/vercel.json`
```json
{
  "version": 2,
  "builds": [
    {
      "src": "src/server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "src/server.js"
    }
  ]
}
```

### 2. `frontend/vercel.json`
```json
{
  "cleanUrls": true,
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://your-backend-vercel-url.vercel.app/api/:path*"
    },
    {
      "source": "/((?!api|assets|favicon.ico|logo.png|.*\\.).*)",
      "destination": "/index.html"
    }
  ]
}
```
