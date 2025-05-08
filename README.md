BidBox - Online Auction Platform

BidBox is a full-stack web application that provides a platform for online auctions. Users can list items for auction, place bids, and participate in real-time bidding experiences.

Features

- User authentication and authorization
- Real-time auction listings
- Bidding system with countdown timers
- User dashboard for managing auctions and bids
- Secure payment integration
- Responsive design for all devices
- Bidding history tracking
- Search and filter auctions by category

-> Tech Stack

Frontend
- React with TypeScript
- Vite for build tooling
- React Router for navigation
- React Icons for UI elements
- Axios for API requests
- CSS for styling

Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- CORS for cross-origin requests
- Helmet for security
- Rate limiting for API protection

Getting Started

1. Clone the repository:
```bash
git clone [your-repo-url]
cd vs-se-pro
```

2. Install dependencies:
```bash
npm run install-deps
```

3. Set up environment variables:
   - Create `.env` in frontend directory
   - Create `.env` in backend directory
   - Add necessary environment variables (see .env.example)

4. Start the development servers:
```bash
npm start
```

## 📁 Project Structure

vs-se-pro/
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── utils/        # Utility functions
│   │   └── styles/       # CSS styles
│   └── public/           # Static files
└── backend/              # Node.js backend
    ├── models/           # MongoDB models
    ├── routes/           # API routes
    ├── middleware/       # Express middleware
    └── services/         # Business logic

🔒 Authentication
Local authentication with email/password
Test account available:
Email: test@gmail.com(or any mu email_id)
Password: Test1234

Usage
Create an account or use test credentials
Browse available auctions
Place bids on items
Create your own auctions
Track bidding history
View won auctions

Demo video

https://github.com/user-attachments/assets/4fe2fc78-89a2-4d91-8d15-0839a79cc3cb

