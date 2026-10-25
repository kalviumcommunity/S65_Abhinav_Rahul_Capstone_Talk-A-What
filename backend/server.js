
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Lesson = require('./models/Lesson');
const Question = require('./models/Question');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Check MongoDB ID format
const isValidLessonId = (id) => mongoose.isValidObjectId(id);

// GET: Retrieve all lessons from MongoDB
app.get('/api/lessons', async (req, res) => {
  try {
    const lessons = await Lesson.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: lessons.length,
      data: lessons
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve lessons'
    });
  }
});

// GET: Retrieve one lesson by MongoDB ID
app.get('/api/lessons/:id', async (req, res) => {
  try {
    if (!isValidLessonId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid lesson ID'
      });
    }

    const lesson = await Lesson.findById(req.params.id);

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found'
      });
    }

    res.status(200).json({
      success: true,
      data: lesson
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve lesson'
    });
  }
});

// POST: Create and save a lesson in MongoDB
app.post('/api/lessons', async (req, res) => {
  try {
    const { title, description, level } = req.body;

    if (
      typeof title !== 'string' || !title.trim() ||
      typeof description !== 'string' || !description.trim() ||
      typeof level !== 'string' || !level.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, and level are required'
      });
    }

    const newLesson = await Lesson.create({
      title: title.trim(),
      description: description.trim(),
      level: level.trim()
    });

    res.status(201).json({
      success: true,
      message: 'Lesson created successfully',
      data: newLesson
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to create lesson'
    });
  }
});

// PUT: Update an existing MongoDB lesson
app.put('/api/lessons/:id', async (req, res) => {
  try {
    if (!isValidLessonId(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid lesson ID'
      });
    }

    const { title, description, level } = req.body;

    if (
      typeof title !== 'string' || !title.trim() ||
      typeof description !== 'string' || !description.trim() ||
      typeof level !== 'string' || !level.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: 'Title, description, and level are required'
      });
    }

    const updatedLesson = await Lesson.findByIdAndUpdate(
      req.params.id,
      {
        title: title.trim(),
        description: description.trim(),
        level: level.trim()
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedLesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Lesson updated successfully',
      data: updatedLesson
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to update lesson'
    });
  }
});

// Health-check endpoint
app.get('/api/test-put', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Correct server is running'
  });
});

/* POST: Create a question linked to a lesson */
app.post('/api/lessons/:id/questions', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid lesson ID'
      });
    }

    const lesson = await Lesson.findById(id);

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found'
      });
    }

    const { questionText, options, correctAnswer } = req.body;

    if (
      typeof questionText !== 'string' ||
      !questionText.trim() ||
      !Array.isArray(options) ||
      options.length < 2 ||
      !options.every(option => typeof option === 'string' && option.trim()) ||
      typeof correctAnswer !== 'string' ||
      !options.includes(correctAnswer)
    ) {
      return res.status(400).json({
        success: false,
        message: 'Provide a question, at least two options, and a correct answer from those options'
      });
    }

    const question = await Question.create({
      questionText: questionText.trim(),
      options: options.map(option => option.trim()),
      correctAnswer,
      lesson: lesson._id
    });

    res.status(201).json({
      success: true,
      message: 'Question linked to lesson successfully',
      data: question
    });
  } catch (error) {
    console.error('Failed to create question:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to create question'
    });
  }
});

/* GET: Retrieve all questions belonging to a lesson */
app.get('/api/lessons/:id/questions', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid lesson ID'
      });
    }

    const lesson = await Lesson.findById(id);

    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found'
      });
    }

    const questions = await Question.find({ lesson: lesson._id });

    res.status(200).json({
      success: true,
      lesson: lesson.title,
      count: questions.length,
      data: questions
    });
  } catch (error) {
    console.error('Failed to retrieve questions:', error.message);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve questions'
    });
  }
});

// Handle unknown routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`
  });
});

// Connect to MongoDB before starting the server
async function startServer() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is missing from the .env file');
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB successfully');

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();
