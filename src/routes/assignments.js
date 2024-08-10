const express = require('express');
const { authenticateToken } = require('../middleware/authenticateToken');
const db = require('../models/database');
const router = express.Router();

/// get all assignments from sql_lite
router.get('/', authenticateToken, (req, res) => {
    db.all('SELECT * FROM assignments', [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ assignments: rows });
    });
});

//get single assignment by using id
router.get('/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM assignments WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ message: 'Assignment not found' });
        }
        res.json({ assignment: row });
    });
});

//create new assignment route
router.post('/', authenticateToken, (req, res) => {
    const { title, description, dueDate } = req.body;
    db.run('INSERT INTO assignments (title, description, dueDate) VALUES (?, ?, ?)', 
           [title, description, dueDate], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: this.lastID });
    });
});

//update an assignment using id 
router.put('/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    const { title, description, dueDate } = req.body;
    db.run('UPDATE assignments SET title = ?, description = ?, dueDate = ? WHERE id = ?',
           [title, description, dueDate, id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Assignment not found' });
        }
        res.status(200).json({ message: 'Assignment updated successfully' });
    });
});

//delete an assignment using id
router.delete('/:id', authenticateToken, (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM assignments WHERE id = ?', [id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Assignment not found' });
        }
        res.status(200).json({ message: 'Assignment deleted successfully' });
    });
});

module.exports = router;
