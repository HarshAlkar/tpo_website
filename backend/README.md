# TPO Backend API

This is the backend API for the TPO (Training & Placement Office) website.

## Features

- Student registration
- Contact form handling
- Email notifications
- MongoDB database integration

## Deployment on Render

### Prerequisites

1. **MongoDB Atlas Database**
   - Create a free MongoDB Atlas account
   - Create a new cluster
   - Get your connection string

2. **Gmail App Password**
   - Enable 2-factor authentication on your Gmail
   - Generate an app password for the application

### Environment Variables

Set these environment variables in Render:

- `PORT`: 5000 (or let Render assign one)
- `MONGODB_URI`: Your MongoDB Atlas connection string
- `EMAIL_USER`: Your Gmail address
- `EMAIL_PASS`: Your Gmail app password
- `ADMIN_EMAIL`: Admin email for notifications

### Deployment Steps

1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set the build command: `npm install`
4. Set the start command: `npm start`
5. Add environment variables
6. Deploy!

## Local Development

```bash
npm install
npm run dev
```

The server will start on http://localhost:5000 