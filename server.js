const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

const User = require('./models/userModel')

app.use(cors());
app.use(express.json())

const uri = "mongodb+srv://admin:Password100@community-portal.se6l09d.mongodb.net/?retryWrites=true&w=majority&appName=community-portal";

async function connect() {
    try {
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    }
    catch (error){
        console.error(error);
    }
}

// Function to get today's date in short date format (MM/DD/YYYY)
function getTodayDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    return mm + '/' + dd + '/' + yyyy;
}

connect();

// Function to generate a random 2-digit ID
function generateRandomID() {
    return Math.floor(Math.random() * 90) + 10; // Generates a number between 10 and 99
}


//POST users
/* app.post('/users', async (req, res) => {
    try {

        const user = await User.create(req.body)
        res.status(200).json(user)

    } catch (error) {

        console.log(error.message);
        res.status(500).json({message: error.message})
    }
}) */

//POST user new
app.post('/users', async (req, res) => {
    try {
        const newUser = {
            id: generateRandomID().toString(),
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            member_since: getTodayDate()
        };
        const user = await User.create(newUser);
        res.status(200).json(user);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

//Get Users table
app.get('/users', async (req,res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//GET User profile
app.get('/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//update profile
app.put('/users/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        if(!user){
            return res.status(404).json({message: `cannot find user with ID ${id}`})
        }
        const updatedUser = await User.findById(id)
        res.status(200).json(updatedUser);

    } catch (error) {

        res.status(500).json({message: error.message})

    }
})

//Server connected string
app.listen(8000, () => {
    console.log("Server started on port 8000");
})



