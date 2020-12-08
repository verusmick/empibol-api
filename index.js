const express = require('express');
require('dotenv').config();
const cors = require('cors');

const { dbConnection } = require('./database/config');

// create express server
const app = express();

// Database
dbConnection();

// CORS
app.use(cors());

// Public
app.use(express.static('public'));

//read and body parse
app.use(express.json());

// Endpoints
app.use('/api/auth', require('./routes/auth'));
app.use('/api/roles', require('./routes/roles'));
app.use('/api/users', require('./routes/users'));
app.use('/api/clients', require('./routes/clients'));

app.use('/api/image', require('./routes/image'));
app.use('/api/checkIn', require('./routes/checkIn'));
app.use('/api/checkOut', require('./routes/checkOut'));

app.use('/api/report', require('./routes/reports'));

// listen requaries
app.listen(process.env.PORT, () => {
    console.log(`Server running in port ${process.env.PORT}`);
});
