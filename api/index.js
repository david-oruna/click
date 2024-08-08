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

// Log environment variables (excluding sensitive information)
console.log('Supabase URL:', process.env.SUPABASE_URL);

// Health check route
app.get('/health', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('users')
            .select('id')
            .limit(1);
        if (error) {
            throw error;
        }
        res.send('Database connection is healthy');
    } catch (err) {
        console.error('Database connection error:', err);
        res.status(500).send('Database connection error');
    }
});

// Route for /game
app.get('/game', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/game.html'));
});

// Register route
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const { data, error } = await supabase
        .from('users')
        .insert([{ username, password }]);
    if (error) {
        res.status(500).json({ message: 'Error registering user' });
    } else {
        res.redirect('/game');
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .eq('password', password)
        .single();
    if (error || !data) {
        res.status(401).json({ message: 'Invalid username or password' });
    } else {
        res.redirect('/game');
    }
});
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});