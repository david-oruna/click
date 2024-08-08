const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users_clickrush'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to MySQL Database');
});

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Registration route   
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            return res.status(500).send('Server error');
        }
        res.redirect('/game');
    });
});

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(sql, [username, password], (err, results) => {
        if (err) {
            return res.status(500).send('Server error');
        }
        if (results.length > 0) {
            res.redirect('/game');
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
});

app.get('/game', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'game.html'));
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});