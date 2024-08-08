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
    res.send('Game route is working');
});

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

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});