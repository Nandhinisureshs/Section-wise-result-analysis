const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const bcrypt = require('bcryptjs');

// GET all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find({}, '-password');
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET single student by roll number
router.get('/:rollNo', async (req, res) => {
    try {
        const student = await Student.findOne({ rollNo: req.params.rollNo }, '-password');
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST create new student
router.post('/', async (req, res) => {
    try {
        const { rollNo, name, year, section, academicYear, password, marks } = req.body;
        
        // Check if student exists
        const existingStudent = await Student.findOne({ rollNo });
        if (existingStudent) {
            return res.status(400).json({ message: 'Student with this roll number already exists' });
        }
        
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const student = new Student({
            rollNo,
            name,
            year,
            section,
            academicYear,
            password: hashedPassword,
            marks: new Map(Object.entries(marks))
        });
        
        const newStudent = await student.save();
        res.status(201).json({ message: 'Student created', student: { ...newStudent.toObject(), password: undefined } });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT update student
router.put('/:rollNo', async (req, res) => {
    try {
        const { name, year, section, academicYear, marks } = req.body;
        
        const updateData = {
            name,
            year,
            section,
            academicYear,
            marks: new Map(Object.entries(marks)),
            updatedAt: Date.now()
        };
        
        const student = await Student.findOneAndUpdate(
            { rollNo: req.params.rollNo },
            updateData,
            { new: true, runValidators: true }
        );
        
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        
        res.json({ message: 'Student updated', student: { ...student.toObject(), password: undefined } });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE student
router.delete('/:rollNo', async (req, res) => {
    try {
        const student = await Student.findOneAndDelete({ rollNo: req.params.rollNo });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST verify student login
router.post('/login', async (req, res) => {
    try {
        const { rollNo, password } = req.body;
        const student = await Student.findOne({ rollNo });
        
        if (!student) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        const isValidPassword = await bcrypt.compare(password, student.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        const studentData = student.toObject();
        delete studentData.password;
        
        res.json({ message: 'Login successful', student: studentData });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET statistics
router.get('/stats/overview', async (req, res) => {
    try {
        const totalStudents = await Student.countDocuments();
        const studentsBySection = await Student.aggregate([
            { $group: { _id: '$section', count: { $sum: 1 } } }
        ]);
        const studentsByYear = await Student.aggregate([
            { $group: { _id: '$year', count: { $sum: 1 } } }
        ]);
        
        res.json({
            totalStudents,
            bySection: studentsBySection,
            byYear: studentsByYear
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;