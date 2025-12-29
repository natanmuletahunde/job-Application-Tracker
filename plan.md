MASTER DOCUMENTATION PROMPT (Frontend-Only Project)

Role & Goal

You are a senior frontend engineer and technical documentation expert.

Your task is to create professional, clear, and beginner-friendly documentation for a Frontend-Only Blog Website.
This project does NOT have a backend or APIs.
All data is stored and managed locally using JSON files inside the frontend project.

The documentation must be complete, well-structured, and easy to understand for interns and junior developers.

🔥 Project Overview (Must Explain Clearly)

This is a Frontend-Only Blog Application

There is NO backend server

There are NO REST APIs

There is NO database

All blog data, users, and configuration are stored in local JSON files

Data is fetched using static imports or local fetch calls

The project is suitable for:

Learning frontend architecture

UI/UX practice

Portfolio projects

Intern-level training

🧱 Tech Stack (Explain Each)

Framework / Library: React (with TypeScript)

Styling: Tailwind CSS

Routing: React Router

State Management: React Hooks

Data Source: Local JSON files

Build Tool: Vite

No Backend / No Authentication Server

📁 Folder Structure (VERY IMPORTANT)

You must explain every folder and file clearly.

Example (you can improve it):

src/
│── assets/
│── components/
│   ├── BlogCard.tsx
│   ├── Navbar.tsx
│   └── Footer.tsx
│
│── pages/
│   ├── Home.tsx
│   ├── BlogDetails.tsx
│   └── CreateBlog.tsx
│
│── data/
│   ├── blogs.json
│   ├── users.json
│
│── hooks/
│   └── useBlogs.ts
│
│── types/
│   └── blog.ts
│
│── App.tsx
│── main.tsx


For each folder and file, explain:

What it does

Why it exists

How it interacts with other files

📦 JSON Data Handling (Core Part)

You MUST explain in detail:

Where JSON files are stored

The structure of each JSON file

Example JSON objects

How data is:

Read

Displayed

Added

Updated

Deleted

That data persistence is local only

Changes reset when JSON files are reset

Example:

{
  "id": "1",
  "title": "My First Blog",
  "content": "This is a sample blog",
  "author": "Admin",
  "createdAt": "2025-01-01"
}

🔁 Application Flow (Explain Step-by-Step)

Explain clearly:

App loads

JSON data is read

Blogs are displayed

User navigates between pages

Actions update local state

No server communication happens

🚫 Important Limitations (Be Explicit)

Include a section explaining:

No real authentication

No database

No real API calls

No server-side validation

This is NOT production-ready

This is a learning & demo project

🎯 Who This Project Is For

Frontend interns

Beginners learning React

Students building portfolios

UI/UX practice

Offline demos

🧪 How to Run the Project

Explain step-by-step:

npm install
npm run dev


Mention:

Node.js version

Browser support

Localhost usage

✨ Documentation Style Rules

Use simple language

Use clear headings

Use code blocks

Use bullet points

Avoid backend terminology

Emphasize frontend-only architecture

✅ Final Requirement

The documentation must feel:

Professional

Clean

Beginner-friendly

Intern-ready

Clear that everything is frontend + local JSON