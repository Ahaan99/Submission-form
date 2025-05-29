const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 4000;  // Change the port number here

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the form on the root route
app.get('/', (req, res) => {
    res.render('index');
});

// Handle form submissions
app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
        return res.status(400).send('All fields are required');
    }
    
    res.render('result', { 
        name, 
        email,
        message,
        submitted: true
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});