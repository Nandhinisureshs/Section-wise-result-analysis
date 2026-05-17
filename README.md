# 📊 Student Result Analysis System

A web-based platform to manage and analyze student performance across sections, with real-time analytics and an AI-powered assistant.

---

## 🚀 Features

**Staff**
- Dashboard with total students, averages, top performers
- Section-wise comparison with charts
- Subject analysis across sections
- Add/Edit/Delete students

**Students**
- Personal performance dashboard
- Subject-wise marks and grades
- Section ranking

**AI Assistant**
- Ask anything naturally (no predefined questions)
- Get instant answers about marks, sections, subjects

**Data Storage**
- Permanent JSON file storage
- Data persists after refresh

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | HTML5, CSS3, JavaScript, Chart.js |
| Backend | Node.js, Express.js |
| Storage | JSON File System |

---

## 📁 Folder Structure

```
├── backend/
│   ├── server.js
│   ├── students.json
│   └── package.json
└── frontend/
    └── index.html
```

---

## 🔧 Installation

```bash
# Clone repository
git clone https://github.com/yourusername/student-result-analysis.git
cd student-result-analysis

# Install backend
cd backend
npm install

# Start server
node server.js

# Open frontend - double-click frontend/index.html
```

---

## 🔑 Login Credentials

**Staff**
- Email: `staff@college.edu`
- Password: `staff123`

**Students**
- Roll No: Any (e.g., `927623bec001`)
- Password: Same as roll number

---

## 📊 Sample Students

| Roll No | Name | Year | Section | Percentage |
|---------|------|------|---------|------------|
| 927623bec001 | Nivetha | 3rd | A | 86.2% |
| 927623bec002 | Kaviya | 3rd | A | 74.8% |
| 927624bec001 | Anjali | 2nd | A | 88.4% |
| 927622bec001 | Soundarya | 4th | C | 93.0% |

*16 total students across all sections*

---

## 📚 Subjects by Year

| Year | Subjects |
|------|----------|
| 1st | Maths, Physics, Chemistry, Programming, Electrical |
| 2nd | Maths-II, Data Structures, DBMS, OOP, Networks |
| 3rd | Signals, DSP, Microprocessors, Communication, OS |
| 4th | AI, ML, Cloud Computing, Big Data, Project |

---

## 🎯 Grade System

| Percentage | Grade |
|------------|-------|
| 85%+ | A+ (Excellent) |
| 75-84% | A (Good) |
| 60-74% | B (Average) |
| 40-59% | C (Needs Improvement) |
| Below 40% | F (Poor) |

---

## 🚦 Running the App

```bash
# Terminal 1 - Backend
cd backend
node server.js

# Then open frontend/index.html in browser
```

Backend: `http://localhost:5000`

---

## 💬 AI Assistant Examples

- "Top performer in section A"
- "Section B average"
- "Compare all sections"
- "Total students in 3rd year"
- "Data Structures average marks"

---

## 📝 Notes

- Data saves automatically to `students.json`
- Refresh = logout (login again)
- Student password = roll number by default

---

**Made with ❤️**
