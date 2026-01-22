# Solexity AI Extension Website - MERN Stack

A complete MERN (MongoDB, Express.js, React, Node.js) stack application for the Solexity AI browser extension - an intelligent screen analysis tool that helps users understand and interact with web content through AI-powered insights.

## 🚀 Features

### Frontend (React + TypeScript + Vite)
- **Modern Design**: Clean, professional UI built with React and Tailwind CSS
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Interactive Components**: Engaging user interface with smooth animations
- **SEO Optimized**: Comprehensive meta tags and structured content
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Real-time Analytics**: Track user interactions and extension usage
- **Download Tracking**: Monitor extension downloads and user behavior

### Backend (Node.js + Express + MongoDB)
- **RESTful API**: Complete CRUD operations for users, analytics, and downloads
- **MongoDB Integration**: Robust data models with proper indexing
- **Security**: Helmet.js, CORS, rate limiting, and input validation
- **Analytics Engine**: Track user behavior, page views, and extension usage
- **Download Management**: Monitor and analyze extension download patterns
- **Error Handling**: Comprehensive error handling and logging
- **Performance**: Optimized queries and database indexing

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with shadcn/ui components
- **Icons**: Lucide React
- **UI Components**: Radix UI primitives
- **State Management**: React Hooks
- **HTTP Client**: Fetch API with custom service layer

### Backend
- **Runtime**: Node.js with ES modules
- **Framework**: Express.js 5.x
- **Database**: MongoDB with Mongoose ODM
- **Security**: Helmet.js, CORS, express-rate-limit
- **Logging**: Morgan
- **Environment**: dotenv for configuration
- **Validation**: Mongoose schema validation

### Database Models
- **User**: User profiles, preferences, and activity tracking
- **Analytics**: Event tracking, user behavior, and performance metrics
- **Download**: Extension download tracking and statistics

## 📋 Project Structure

```
solexity-downloader-web/
├── backend/                    # Backend API server
│   ├── models/                # MongoDB schemas
│   │   ├── User.js           # User model
│   │   ├── Analytics.js      # Analytics model
│   │   └── Download.js       # Download model
│   ├── routes/               # API routes
│   │   ├── userRoutes.js     # User endpoints
│   │   ├── analyticsRoutes.js # Analytics endpoints
│   │   └── downloadRoutes.js # Download endpoints
│   ├── config.env            # Environment variables
│   ├── package.json          # Backend dependencies
│   └── server.js             # Main server file
├── src/                      # Frontend React app
│   ├── components/           # React components
│   │   ├── ui/              # shadcn/ui components
│   │   ├── Analytics.tsx    # Analytics tracking
│   │   ├── InstallSection.tsx # Download section
│   │   └── ...              # Other components
│   ├── services/            # API services
│   │   └── api.ts          # API client and utilities
│   ├── App.tsx             # Main app component
│   └── main.tsx            # App entry point
├── package.json             # Frontend dependencies
├── vite.config.ts          # Vite configuration
└── README.md               # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+ 
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd solexity-downloader-web
```

2. **Install backend dependencies:**
```bash
cd backend
npm install
```

3. **Install frontend dependencies:**
```bash
cd ..
npm install
```

4. **Set up environment variables:**
```bash
# In backend/config.env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/solexity_db
JWT_SECRET=''
JWT_EXPIRE=30d
CORS_ORIGIN=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

5. **Start MongoDB:**
```bash
# If using local MongoDB
mongod

# Or use MongoDB Atlas (cloud)
# Update MONGO_URI in config.env
```

6. **Start the backend server:**
```bash
cd backend
npm run dev
```

7. **Start the frontend development server:**
```bash
# In a new terminal
npm run dev
```

8. **Open your browser:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Health Check: http://localhost:5000/api/health

## 📊 API Endpoints

### Health Check
- `GET /api/health` - Server health status

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Analytics
- `GET /api/analytics` - Get all analytics
- `GET /api/analytics/user/:userId` - Get user analytics
- `POST /api/analytics` - Create analytics entry
- `GET /api/analytics/summary` - Get analytics summary
- `GET /api/analytics/range` - Get analytics by date range

### Downloads
- `GET /api/downloads` - Get all downloads
- `GET /api/downloads/:id` - Get download by ID
- `POST /api/downloads` - Create download record
- `GET /api/downloads/stats/summary` - Get download statistics
- `GET /api/downloads/stats/range` - Get downloads by date range
- `GET /api/downloads/links` - Get download links

## 🔧 Development

### Backend Development
```bash
cd backend
npm run dev          # Start with nodemon
npm start           # Start production server
```

### Frontend Development
```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
```

### Database Operations
```bash
# Connect to MongoDB shell
mongosh

# Use database
use solexity_db

# View collections
show collections

# Query data
db.users.find()
db.analytics.find()
db.downloads.find()
```

## 🚀 Deployment

### Backend Deployment (Heroku/ Railway/ Render)
1. Set environment variables in your hosting platform
2. Ensure MongoDB connection string is set
3. Deploy using Git or platform CLI

### Frontend Deployment (Vercel/ Netlify)
1. Build the project: `npm run build`
2. Deploy the `build` folder
3. Set environment variables if needed

### Environment Variables for Production
```bash
NODE_ENV=production
MONGO_URI=your-production-mongodb-uri
JWT_SECRET=your-production-jwt-secret
CORS_ORIGIN=https://your-frontend-domain.com
```

## 📈 Analytics & Monitoring

The application includes comprehensive analytics tracking:

- **Page Views**: Track user navigation and page visits
- **User Interactions**: Monitor button clicks and form submissions
- **Download Tracking**: Analyze extension download patterns
- **Performance Metrics**: Monitor load times and errors
- **User Behavior**: Track session data and user preferences

## 🔒 Security Features

- **CORS Protection**: Configured for specific origins
- **Rate Limiting**: Prevents abuse and DDoS attacks
- **Input Validation**: Mongoose schema validation
- **Security Headers**: Helmet.js for security headers
- **Error Handling**: Secure error responses
- **Data Sanitization**: Input sanitization and validation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Commit your changes: `git commit -m 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## 📞 Support

- **Email**: m.chunawala@somaiya.edu
- **Phone**: +91 9892807086
- **Support Hours**: 9 AM - 6 PM (IST)

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Design inspiration from Figma community
- UI components from shadcn/ui
- Icons from Lucide React
- Images from Unsplash
- MongoDB documentation and best practices
  