const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Initialize SQLite database
const db = new sqlite3.Database('./tasks.db');

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));  // Serving static files

app.post('/create-task', (req, res) => {
    const { unity, person, description, priority, created_at } = req.body;

    const sql = `
        INSERT INTO tasks (unity, person, description, priority, created_at)
        VALUES (?, ?, ?, ?, ?)
    `;
    
    db.run(sql, [unity, person, description, priority, created_at], function(err) {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to create task' });
        } else {
            res.status(200).json({ message: 'Task Created' });
        }
    });
});

app.get('/tasks', (req, res) => {
    const sql = `
        SELECT * FROM tasks
        ORDER BY created_at ASC
    `;
    
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Failed to retrieve tasks' });
        } else {
            res.json(rows);
        }
    });
});

// DELETE route to remove a task from the database
app.delete('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    const sql = 'DELETE FROM tasks WHERE id = ?';

    db.run(sql, [taskId], function(err) {
        if (err) {
            console.error('Error deleting task:', err.message);
            return res.status(500).json({ error: 'Failed to delete task' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
