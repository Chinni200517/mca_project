# Food Delivery App

A full-stack food delivery application with:
- Customer frontend
- Admin dashboard
- Backend API with MongoDB

## Features
- Browse food items
- Add to cart and place orders
- Admin add/remove food items
- Authentication and order flow

## Run locally

### Backend
```bash
cd backend
npm install
npm run reset:db
npm run server
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Admin
```bash
cd admin
npm install
npm run dev
```

## Deploy note
Set the API URL in the frontend/admin .env files before publishing.
