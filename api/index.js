require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Supabase client
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// Routes
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const { data, error } = await supabase
        .from('users')
        .insert([{ username, password }]);
    if (error) {
        res.status(500).send('Error registering user');
    } else {
        res.send('User registered');
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .eq('password', password);
    if (error) {
        res.status(500).send('Error logging in');
    } else if (data.length > 0) {
        res.send('Login successful');
    } else {
        res.send('Invalid credentials');
    }
});

app.get('/game', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'game.html'));
});

// Serve index.html at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

module.exports = app;