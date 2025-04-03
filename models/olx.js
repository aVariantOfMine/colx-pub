const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const db_link = process.env.DB_LINK
mongoose.connect(db_link)
.then((db)=>{
    console.log('[+] olx db connected')
})
.catch((err)=>{
    console.error('[+]', err)
})

const olxSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    seller: {
        type: String,
        required: true
    },
    seller_contact: {
        type: String,
        required: true
    },
    // category: {
    //     type: String,
    //     required: true
    // },
    // contact: {
    //     type: String,
    //     required: true
    // },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Olx', olxSchema)