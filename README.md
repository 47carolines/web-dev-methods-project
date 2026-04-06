# Web Development Methods Project
Web Development Methods Project required for Graduate students in CS 7830 Web Application Development II.

---

# 🚀 Frontend (React)

## Setup
1. cd frontend/insurance_client
2. npm install
3. cp .env.example .env
4. npm run dev

## URL
http://localhost:5173

## Environment Variables

Create a `.env` file:

VITE_API_URL=http://127.0.0.1:3000

---

# 🧠 Backend (Ruby on Rails)

## Setup
1. cd backend/insurance_api
2. bundle install
3. cp .env.example .env
4. rails db:create
5. rails db:migrate
6. rails db:seed
7. rails server

## URL
http://localhost:3000

## Environment Variables

Create a `.env` file:

DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=insurance_api_development

---

# 🗄️ MySQL (Homebrew)

## Start services
brew services start mysql

## Check status
brew services list

## Stop services
brew services stop mysql

---

# 📚 Reference
Rails setup guide:
https://gorails.com/setup/macos/26-tahoe