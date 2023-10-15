require('dotenv').config()
const express = require('express');
const db = require('./config/db');
const userRuoter = require('./routes/user');
const groupRouter = require('./routes/group');
const port = process.env.PORT;
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connect DB
db.authenticate();

// router
app.use('/api/v1/user', userRuoter);
app.use('/api/v1/group', groupRouter);


app.listen(port, () => {
    console.log('listen on port ', port)
})