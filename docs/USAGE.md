# Understand the Project Structure

This project is divided into **three repositories**, as mentioned in the main `README.md`. Below is a quick overview of each repository and how they work together.

## Repositories Overview

1. **Frontend** – https://github.com/Subhajeetch/Animekun-frontend  
   *(Current repository – contains the complete frontend and some API routes using the Next.js routing system)*

2. **Backend** – https://github.com/Subhajeetch/Animekun-backend  
   *(Contains all core APIs and the video proxy logic)*

3. **Database** – Cloudflare D1 – https://github.com/Subhajeetch/Animekun-db-cf  
   *(Handles user accounts, authentication, and logging)*

---

## Quick Access

- [Local Usage](#local-usage)
  - [Step 1 – Cloning Repositories](#step-1--cloning-repositories)
  - [Step 2 – Open Projects](#step-2--open-projects)
  - [Step 3 – Setup Environment Variables](#step-3--setup-environment-variables)
  - [Step 4 – Start Servers](#step-4--start-servers)
    - [A – Start Database Server](#a--start-database-server)
    - [B – Start Main Backend](#b--start-main-backend)
    - [C – Add Backend URL to Frontend Config](#c--add-backend-url-to-frontend-config-important)
    - [D – Start the Main Frontend](#d--start-the-main-frontend)
  - [Step 5 – Open Frontend in the Browser](#step-5--open-frontend-in-the-browser)
- [Deployment](#deployment)

---

## Local Usage

### Step 1 – Cloning Repositories

Clone all three repositories to your local machine.

**Example (for one repository):**
```bash
git clone https://github.com/Subhajeetch/Animekun-frontend.git
```

---

### Step 2 – Open Projects

Open **three separate terminals**, and navigate to each project directory in a different terminal.

**Recommended:**  
It is strongly recommended to host the database repository (`Animekun-db-cf`) on **Cloudflare Workers**. This way, you won’t need to keep three terminals running locally. Hosting it on Cloudflare is straightforward and well-documented in the repository.

---

### Step 3 – Setup Environment Variables

1. Open your code editor (e.g., **VS Code**).
2. Open the **frontend** project.
3. Create a `.env.local` file in the root directory.
4. Refer to the example file: `.env.local.example`.

Add your hosted **Animekun-db-cf** URL to:
```env
CF_DB_URI=
```

> If you do not want to host the database on Cloudflare, you can run it locally and provide the local development URL instead.

---

#### Discord Webhooks

Create **two webhooks** in your Discord server:
- One for bug reports
- One for contact messages

Add their URLs to the following environment variables:
```env
DISCORD_WEBHOOK_URI_BUG_REPORTS=
DISCORD_WEBHOOK_URI_CONTACTS=
```

---

### Step 4 – Start Servers

Now we will start the backend and frontend servers.

---

#### A – Start Database Server

Repository: **Animekun-db-cf** (Cloudflare D1)

Start the server using:
```bash
npm start
```

> Skip this step if the database is already hosted on Cloudflare Workers.

---

#### B – Start Main Backend

Repository: **Animekun-backend**

This server contains all critical backend APIs required for the project to function.

Start the server using:
```bash
npm run dev
```

---

#### C – Add Backend URL to Frontend Config (**IMPORTANT**)

Open the `mine.config.js` file located in the root of the frontend repository.

Example configuration:
```js
const MineConfig = {
  backendUrl: "http://localhost:4000",
};

export default MineConfig;
```

Update `backendUrl` with your backend server endpoint.

- If you are using the default port (`4000`), no changes are required.
- If the backend is hosted on a VM or any external service, replace it with the hosted URL.

---

#### D – Start the Main Frontend

Repository: **Animekun-frontend**

This project is built with **Next.js**.

Start the frontend server using:
```bash
npm run dev
```

---

### Step 5 – Open Frontend in the Browser

Once all required servers are running, open the following URL in your browser:
```
http://localhost:3000
```

You should now be able to access and use the application.

---

## Deployment

Since this project is divided into three repositories, each part must be deployed separately.

### Database
- Host **Animekun-db-cf** on **Cloudflare Workers** (recommended).

### Frontend
- Host **Animekun-frontend** on platforms such as **Vercel** or any service that supports Next.js deployments.

### Backend (Important Note)

The backend (**Animekun-backend**) is a Node.js server and can technically be hosted on any Node.js-compatible platform. However, there is a critical limitation regarding the **video proxy endpoint**.

#### Why a VM Is Required
The backend scrapes video data from **Megacloud**, which actively blocks requests from certain IP ranges, including:
- Cloudflare
- Vercel
- Similar popular cloud providers

As a result, hosting the backend on these platforms will cause the video proxy to fail.

**Recommended Solution:**  
Host the backend on a **Virtual Machine (VM)** with a less commonly used IP address. This significantly reduces the chance of IP-based blocking.

For more details, refer to the backend repository documentation.
