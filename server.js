/**
 * Server.js - Backend server for Bet That
 * 
 * NOTE: This server will not run on GitHub Pages.
 * GitHub Pages only supports static websites without server-side processing.
 * When deployed to GitHub Pages, the forms will need to use a different approach:
 * 
 * Options for forms on GitHub Pages:
 * 1. Use a third-party form service like Formspree, FormKeep, or Netlify Forms
 * 2. Set up a serverless function using AWS Lambda or Netlify Functions
 * 3. Use a separate backend service for form processing
 * 
 * For local development, you can continue using this server.
 */

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./'));

// Create data directory if it doesn't exist
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Initialize subscribers.json if it doesn't exist
const subscribersFile = path.join(dataDir, 'subscribers.json');
if (!fs.existsSync(subscribersFile)) {
  fs.writeFileSync(subscribersFile, JSON.stringify({ subscribers: [] }));
}

// API endpoint for signup
app.post('/api/signup', (req, res) => {
    const { firstName, lastName, email, updates } = req.body;
    
    // In a production environment, you would save this to a database
    // For demonstration, we'll log it and save to a JSON file
    console.log('New signup:', { firstName, lastName, email, updates });
    
    // Create a data folder if it doesn't exist
    const dataDir = path.join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
    }
    
    // Append to signups.json
    const filePath = path.join(dataDir, 'signups.json');
    let signups = [];
    
    if (fs.existsSync(filePath)) {
        try {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            signups = JSON.parse(fileContent);
        } catch (error) {
            console.error('Error reading signups file:', error);
        }
    }
    
    // Add new signup with timestamp
    signups.push({
        firstName,
        lastName,
        email,
        receivesUpdates: updates,
        timestamp: new Date().toISOString()
    });
    
    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(signups, null, 2), 'utf8');
    
    res.status(200).json({ success: true, message: 'Signup successful!' });
});

// API endpoint for contact form
app.post('/api/contact', (req, res) => {
    const { firstName, lastName, email, message } = req.body;
    
    // In a production environment, you would save this to a database
    // For demonstration, we'll log it and save to a JSON file
    console.log('New contact submission:', { firstName, lastName, email, message });
    
    // Create a data folder if it doesn't exist
    const dataDir = path.join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir);
    }
    
    // Append to contacts.json
    const filePath = path.join(dataDir, 'contacts.json');
    let contacts = [];
    
    if (fs.existsSync(filePath)) {
        try {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            contacts = JSON.parse(fileContent);
        } catch (error) {
            console.error('Error reading contacts file:', error);
        }
    }
    
    // Add new contact with timestamp
    contacts.push({
        firstName,
        lastName,
        email,
        message,
        timestamp: new Date().toISOString()
    });
    
    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2), 'utf8');
    
    res.status(200).json({ success: true, message: 'Thank you for contacting us! We will get back to you soon.' });
});

// Admin endpoint to view all subscribers (in a real app, this would be protected)
app.get('/api/subscribers', (req, res) => {
  try {
    const subscribersData = JSON.parse(fs.readFileSync(subscribersFile));
    res.status(200).json(subscribersData);
  } catch (error) {
    console.error('Error fetching subscribers:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 