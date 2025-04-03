const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const db_link = process.env.DB_LINK
mongoose.connect(db_link)
.then((db)=>{
    console.log('[+] lost and found db connected')
})
.catch((err)=>{
    console.error('[+]', err)
})

const lostAndFoundSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['lost', 'found'],
        required: true
    },
    location: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('LostAndFound', lostAndFoundSchema)