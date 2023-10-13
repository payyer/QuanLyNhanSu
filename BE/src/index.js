require('dotenv').config()
const express = require('express');
const db = require('./config/db');
const models = require('./models/index');
const port = process.env.PORT;
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//connect DB
db.authenticate();

app.get('/', async (req, res) => {
    try {
        const newUser = await models.User.create({ firstName: "Anh", lastName: "Le", email: 'anhle@gmail.com', groupId: 1 });
        res.json({ newUser });
    }
    catch (err) {
        console.log(err)
        res.json({ err })
    }
})

app.get('/group', async (req, res) => {
    try {
        const group = await models.Group.findAll({ include: models.Role });
        res.json({ group });
    }
    catch (err) {
        console.log(err)
        res.json({ err })
    }
})

app.get('/find', async (req, res) => {
    try {
        const users = await models.User.findAll({ include: models.Group });
        const userNames = users.map(user => user.firstName)
        console.log(userNames);
        res.json({ users })
    }
    catch (err) {
        console.log(err)
        res.json({ err })
    }
})



app.listen(port, () => {
    console.log('listen on port ', port)
})