# 🍔 FoodieLand

**FoodieLand** is a modern full-stack web application for exploring and managing cooking recipes.  
Users can browse, search, filter, and manage recipes through a responsive interface and a simple admin dashboard.

Built with **Laravel + Inertia.js + React + TailwindCSS + ShadCN UI**, FoodieLand combines the power of Laravel backend with a modern React frontend for a seamless user experience.

---

## 🌐 GitHub Repository

[https://github.com/said-ouhammou/foodie-land.git](https://github.com/said-ouhammou/foodie-land.git.git)

---

## ✨ Features

- 🧾 Browse all recipes with a clean, responsive UI
- 🔍 Search and filter recipes by title, ingredients, or categories
- 📖 View detailed recipe pages with instructions and ingredients
- 🛠️ Admin dashboard for **adding, editing, and deleting recipes**
- 📱 Fully responsive design for desktop and mobile

---

## 🧱 Tech Stack

| Layer         | Technology    |
| ------------- | ------------- |
| Backend       | Laravel (PHP) |
| Routing/UI    | Inertia.js    |
| Frontend      | React.js      |
| Styling       | TailwindCSS   |
| UI Components | ShadCN UI     |

This stack allows SPA-like frontend interactions while leveraging Laravel for backend logic and routing.

---

## 📦 Getting Started

Follow these steps to run FoodieLand locally:

### 1. Clone the Repository

```bash
git clone https://github.com/said-ouhammou/foodie-land.git.git
cd foodie-land
```

### 2. Install Backend Dependencies

composer install
cp .env.example .env
php artisan key:generate

Update .env with your database credentials.

### 3. Run Database Migrations

php artisan migrate

### 4. Run Seeders

php artisan db:seed

### 5. Link storage

php artisan storage:link

### 6. Install Frontend Dependencies

npm install
npm run dev

### 7. Start the Laravel Server

php artisan serve

Visit:
👉 http://localhost:8000

🧠 How It Works

FoodieLand uses Inertia.js to connect Laravel backend routes to React components.
This allows React pages to be served directly from Laravel controllers, without building a separate API layer.
