const express = require('express');
const dotenv = require('dotenv');

// env here
dotenv.config();

const app = express();
app.use(express.json()); //json req.body

// Import routes
const authRoutes = require('./routes/auth');
const assignmentsRoutes = require('./routes/assignments');

// Use routes

// 
app.use('/api/auth', authRoutes);

app.use('/api/assignments', assignmentsRoutes);

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
