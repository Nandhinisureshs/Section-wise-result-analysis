/*const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    rollNo: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    year: {
        type: String,
        required: true,
        enum: ['1', '2', '3', '4']
    },
    section: {
        type: String,
        required: true,
        enum: ['A', 'B', 'C', 'D']
    },
    academicYear: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    marks: {
        type: Map,
        of: Number,
        default: {}
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Update timestamp on save
studentSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('Student', studentSchema);*/

// server.js
const express = require('express');
const mongoose = require('mongoose');
const Student = require('./models/Student'); // <-- your schema file

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/studentDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// --- CRUD Routes ---

// Create (Add Student)
app.post('/students', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read (Get All Students)
app.get('/students', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// Read (Get One Student by rollNo)
app.get('/students/:rollNo', async (req, res) => {
  const student = await Student.findOne({ rollNo: req.params.rollNo });
  if (!student) return res.status(404).json({ error: "Student not found" });
  res.json(student);
});

// Update (by rollNo)
app.put('/students/:rollNo', async (req, res) => {
  const student = await Student.findOneAndUpdate(
    { rollNo: req.params.rollNo },
    req.body,
    { new: true }
  );
  if (!student) return res.status(404).json({ error: "Student not found" });
  res.json(student);
});

// Delete (by rollNo)
app.delete('/students/:rollNo', async (req, res) => {
  const student = await Student.findOneAndDelete({ rollNo: req.params.rollNo });
  if (!student) return res.status(404).json({ error: "Student not found" });
  res.json({ message: "Student deleted" });
});

// --- Bulk Insert Your JSON Array Once ---
const initialData = require('./students.json'); // put your big JSON array in students.json
app.post('/students/bulk', async (req, res) => {
  try {
    await Student.insertMany(initialData);
    res.json({ message: "Bulk insert successful" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Start server
app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));


