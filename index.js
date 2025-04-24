const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./models/db');
const LostAndFound = require('./models/lost_and_found');
const Olx = require('./models/olx');

dotenv.config();

// connect to database
connectDB();

mongoose.connection.on('connected', () => {
    console.log('[+] Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
    console.log('[-] Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('[-] Mongoose disconnected');
});

const app = express();
const URL = 'http://localhost:3000';

app.use(cors({
    'origin': URL
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));

// Fetch products
app.get('/fetch_products', async (req, res) => {
    try {
        const products = await Olx.find();
        console.log('[+] fetching products...', products);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Post a product for selling
app.post('/post_product', async (req, res) => {
    try {
        const { name, contact, price, title, desc } = req.body;
        await Olx.create({
            seller: name,
            seller_contact: contact,
            price,
            title,
            desc,
        });
        res.redirect(`${URL}/olx/buy`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Get lost & found items
app.get('/get_lost_found', async (req, res) => {
    try {
        const lostFoundItems = await LostAndFound.find();
        console.log('[+] fetching lost and found...', lostFoundItems);
        res.json(lostFoundItems);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Add to lost & found
app.post('/add_to_lost_found', async (req, res) => {
    try {
        const { author, data, type, location, contact, date } = req.body;
        await LostAndFound.create({
            itemName: data,
            description: '',
            type,
            location,
            contact,
            date: new Date(date),
        });
        res.redirect(`${URL}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Delete from lost & found
app.post('/delete_from_lost_found', async (req, res) => {
    try {
        const { id } = req.body;
        await LostAndFound.findByIdAndDelete(id);
        res.redirect(`${URL}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});


// Post a found item
app.post('/post_found', async (req, res) => {
    try {
        const { name, contact, title, desc } = req.body;
        await LostAndFound.create({
            author: name,
            title: title,
            description: desc,
            type: 'found',
            location: '',
            contact: contact,
            date: new Date(),
        });
        res.redirect(`${URL}/lost_and_found/lost_and_found`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Post a lost item
app.post('/post_lost', async (req, res) => {
    try {
        const { name, contact, title, desc } = req.body;
        await LostAndFound.create({
            itemName: title,
            description: desc,
            type: 'lost',
            location: '',
            contact,
            date: new Date(),
        });
        res.redirect(`${URL}/lost_and_found/lost_and_found`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Root route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Start server
let port = 3001;
app.listen(port, () => {
    console.log(`[+] Server is running on port ${port}`);
});

module.exports = app;
