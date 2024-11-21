const express = require('express');
const router = express.Router();
const db = require('./db'); // Import the MySQL connection from db.js
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('326160157051-sulsasmu3q4p8ro3elbaas9b0ci9mokr.apps.googleusercontent.com');

router.post('/google-login', async (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(400).json({ error: 'Token is required' });
    }
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: '326160157051-sulsasmu3q4p8ro3elbaas9b0ci9mokr.apps.googleusercontent.com',
        });
        const payload = ticket.getPayload();
        const { sub: googleId, email, name } = payload;
        const query = `
            INSERT INTO google_logins (google_id, email, name) 
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE email = VALUES(email), name = VALUES(name)
        `;

        db.query(query, [googleId, email, name], (err, result) => {
            if (err) {
                console.error('Error inserting Google login data:', err);
                return res.status(500).json({ error: 'Failed to save Google login details' });
            }
            res.status(200).json({ message: 'Login successful!', user: { googleId, email, name } });
        });
    } catch (error) {
        console.error('Error verifying Google token:', error);
        res.status(401).json({ error: 'Invalid token' });
    }
});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    const query = 'INSERT INTO user_logins (username, password) VALUES (?, ?)';
    db.query(query, [username, password], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ error: 'Failed to insert login details' });
        }
        res.status(200).json({ message: 'Login details saved successfully!' });
    });
});

module.exports = router;
