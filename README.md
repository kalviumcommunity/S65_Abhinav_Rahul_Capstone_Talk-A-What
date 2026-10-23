# S65_Abhinav_Rahul_Capstone_Talk-A-What
# Talk-A-What! (MERN Stack)

## Overview
This project is a language learning application inspired by Duolingo but designed to be easier and focused exclusively on English. Built using the MERN (MongoDB, Express.js, React.js, Node.js) stack, it provides a user-friendly experience for learning English through interactive exercises and progress tracking.

## Features
- **User Authentication**: Sign up, log in, and manage profiles.
- **Lesson Modules**: Organized lessons with progressive difficulty.
- **Quizzes & Exercises**: Interactive challenges to reinforce learning.
- **Progress Tracking**: Track user progress and performance.
- **Admin Panel**: CRUD operations for managing lessons and user data.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS, React Router DOM
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JWT-based authentication
- **File Uploads**: Multer for handling media files

## Installation

### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB
- npm or yarn

## API Endpoints
### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login

### Lessons
- `GET /api/lessons` - Fetch all lessons
- `POST /api/lessons` - Create a new lesson (Admin only)
- `PUT /api/lessons/:id` - Update a lesson (Admin only)
- `DELETE /api/lessons/:id` - Delete a lesson (Admin only)

### User Progress
- `GET /api/progress/:userId` - Get user progress
- `POST /api/progress` - Update progress

## Contributing
Feel free to contribute! Fork the repo and submit a pull request.

## Day-by-Day Development Plan

- **Day 1:** Finalize the project idea, requirements, and user flow.
- **Day 2:** Create low-fidelity wireframes for the main application screens.
- **Day 3:** Design the high-fidelity prototype in Figma.
- **Day 4:** Set up the GitHub repository, README, and project structure.
- **Day 5:** Develop the frontend layout and navigation using React and Tailwind CSS.
- **Day 6:** Build the backend using Node.js, Express.js, and MongoDB.
- **Day 7:** Implement user registration, login, and authentication.
- **Day 8:** Develop lesson modules, vocabulary practice, and quizzes.
- **Day 9:** Implement progress tracking and the admin lesson-management panel.
- **Day 10:** Test the application, fix bugs, and improve usability.
- **Day 11:** Complete documentation and prepare the final project demonstration.




