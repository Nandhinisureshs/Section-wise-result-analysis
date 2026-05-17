const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());

const FILE = 'students.json';

// Default students
const DEFAULT_STUDENTS = [
    {rollNo: '927623bec001', name: 'Nivetha', year: '3', section: 'A', academicYear: '2024-25', password: '927623bec001', marks: {'Signals and Systems': 85, 'Digital Signal Processing': 88, 'Microprocessors': 82, 'Communication Systems': 90, 'Operating Systems': 86}},
    {rollNo: '927623bec002', name: 'Kaviya', year: '3', section: 'A', academicYear: '2024-25', password: '927623bec002', marks: {'Signals and Systems': 78, 'Digital Signal Processing': 82, 'Microprocessors': 75, 'Communication Systems': 68, 'Operating Systems': 71}},
    {rollNo: '927623bec003', name: 'Selvi', year: '3', section: 'B', academicYear: '2024-25', password: '927623bec003', marks: {'Signals and Systems': 92, 'Digital Signal Processing': 89, 'Microprocessors': 94, 'Communication Systems': 88, 'Operating Systems': 91}},
    {rollNo: '927623bec004', name: 'Priya', year: '3', section: 'B', academicYear: '2024-25', password: '927623bec004', marks: {'Signals and Systems': 76, 'Digital Signal Processing': 80, 'Microprocessors': 72, 'Communication Systems': 78, 'Operating Systems': 74}},
    {rollNo: '927624bec001', name: 'Anjali', year: '2', section: 'A', academicYear: '2024-25', password: '927624bec001', marks: {'Engineering Mathematics-II': 88, 'Data Structures': 92, 'Database Management Systems': 85, 'Object Oriented Programming': 90, 'Computer Networks': 87}},
    {rollNo: '927624bec002', name: 'Divya', year: '2', section: 'A', academicYear: '2024-25', password: '927624bec002', marks: {'Engineering Mathematics-II': 75, 'Data Structures': 78, 'Database Management Systems': 72, 'Object Oriented Programming': 80, 'Computer Networks': 76}},
    {rollNo: '927624bec003', name: 'Meena', year: '2', section: 'B', academicYear: '2024-25', password: '927624bec003', marks: {'Engineering Mathematics-II': 85, 'Data Structures': 88, 'Database Management Systems': 90, 'Object Oriented Programming': 86, 'Computer Networks': 89}},
    {rollNo: '927624bec004', name: 'Arthi', year: '2', section: 'B', academicYear: '2024-25', password: '927624bec004', marks: {'Engineering Mathematics-II': 72, 'Data Structures': 68, 'Database Management Systems': 75, 'Object Oriented Programming': 71, 'Computer Networks': 69}},
    {rollNo: '927625bec001', name: 'Lakshmi', year: '1', section: 'A', academicYear: '2024-25', password: '927625bec001', marks: {'Engineering Mathematics-I': 92, 'Engineering Physics': 88, 'Engineering Chemistry': 85, 'Programming Fundamentals': 94, 'Basic Electrical Engineering': 90}},
    {rollNo: '927625bec002', name: 'Saranya', year: '1', section: 'A', academicYear: '2024-25', password: '927625bec002', marks: {'Engineering Mathematics-I': 76, 'Engineering Physics': 72, 'Engineering Chemistry': 68, 'Programming Fundamentals': 82, 'Basic Electrical Engineering': 74}},
    {rollNo: '927625bec003', name: 'Vidhya', year: '1', section: 'C', academicYear: '2024-25', password: '927625bec003', marks: {'Engineering Mathematics-I': 88, 'Engineering Physics': 85, 'Engineering Chemistry': 90, 'Programming Fundamentals': 92, 'Basic Electrical Engineering': 86}},
    {rollNo: '927625bec004', name: 'Geetha', year: '1', section: 'C', academicYear: '2024-25', password: '927625bec004', marks: {'Engineering Mathematics-I': 70, 'Engineering Physics': 68, 'Engineering Chemistry': 72, 'Programming Fundamentals': 75, 'Basic Electrical Engineering': 71}},
    {rollNo: '927622bec001', name: 'Soundarya', year: '4', section: 'C', academicYear: '2024-25', password: '927622bec001', marks: {'Artificial Intelligence': 95, 'Machine Learning': 92, 'Cloud Computing': 88, 'Big Data Analytics': 94, 'Project Work': 96}},
    {rollNo: '927622bec002', name: 'Bharathi', year: '4', section: 'C', academicYear: '2024-25', password: '927622bec002', marks: {'Artificial Intelligence': 78, 'Machine Learning': 82, 'Cloud Computing': 75, 'Big Data Analytics': 80, 'Project Work': 85}},
    {rollNo: '927622bec003', name: 'Ezhil', year: '4', section: 'D', academicYear: '2024-25', password: '927622bec003', marks: {'Artificial Intelligence': 88, 'Machine Learning': 85, 'Cloud Computing': 90, 'Big Data Analytics': 86, 'Project Work': 92}},
    {rollNo: '927622bec004', name: 'Muthulakshmi', year: '4', section: 'D', academicYear: '2024-25', password: '927622bec004', marks: {'Artificial Intelligence': 65, 'Machine Learning': 70, 'Cloud Computing': 68, 'Big Data Analytics': 72, 'Project Work': 75}}
];

// Initialize
let students = [];
if (fs.existsSync(FILE)) {
    students = JSON.parse(fs.readFileSync(FILE));
    console.log('📂 Loaded', students.length, 'students');
} else {
    students = DEFAULT_STUDENTS;
    fs.writeFileSync(FILE, JSON.stringify(students, null, 2));
    console.log('📝 Created file with', students.length, 'students');
}

// Save function
function SAVE() {
    fs.writeFileSync(FILE, JSON.stringify(students, null, 2));
    console.log('💾 SAVED!', students.length, 'students');
}

// Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', count: students.length });
});

app.get('/api/students', (req, res) => {
    const safe = students.map(({ password, ...s }) => s);
    res.json(safe);
});

app.post('/api/students/login', (req, res) => {
    const { rollNo, password } = req.body;
    const s = students.find(s => s.rollNo === rollNo);
    if (s && (password === s.password || password === rollNo)) {
        const { password, ...rest } = s;
        res.json({ success: true, student: rest });
    } else {
        res.status(401).json({ message: 'Invalid' });
    }
});

app.post('/api/students', (req, res) => {
    const newStudent = req.body;
    
    if (students.find(s => s.rollNo === newStudent.rollNo)) {
        return res.status(400).json({ message: 'Student exists' });
    }
    
    students.push(newStudent);
    SAVE();  // THIS SAVES!
    
    console.log('➕ ADDED:', newStudent.name, '-', newStudent.rollNo);
    
    const { password, ...rest } = newStudent;
    res.status(201).json({ success: true, student: rest });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log('\n✅ SERVER READY');
    console.log('📍 http://localhost:' + PORT);
    console.log('👥 Students:', students.length);
    console.log('💾 Data will save to', FILE);
    console.log('🔄 Refresh page - data stays!\n');
});