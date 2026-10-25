
const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Lesson title is required'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'Lesson description is required'],
      trim: true
    },
    level: {
      type: String,
      required: [true, 'Lesson level is required'],
      enum: ['Beginner', 'Intermediate', 'Advanced']
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Lesson', lessonSchema);
