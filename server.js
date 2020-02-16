const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

const userRoutes = require('./routes/userRoutes');
const configs = require('./config')
// adding body parser middleware
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({ type: 'application/json' }));

// adding user middleware
app.use('/', userRoutes);

// connecting to the db and starting the server
mongoose.connect(
    configs.server_url
    ).then(result => {
        app.listen(3000);
    }).catch(error => {
        console.log(error)
    });
