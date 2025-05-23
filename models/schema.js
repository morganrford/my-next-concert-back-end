const mongoose = require('mongoose')

const bandSchema = mongoose.Schema({
    bandName: {
        type: String,
        required: true,
    },
    members: {
        type: String,
        required: false,
    },
    genre: {
        type: String,
        required: false,
    },
})


const concertSchema = mongoose.Schema({
    venueName: {
        type: String,
        required: true,
    },
    venueAddress: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: false,
    },
    promoter: {
        type: String,
        required: false,
    },
    bands: [bandSchema],
})

const Band = mongoose.model('Band', bandSchema);
const Concert = mongoose.model('Concert', concertSchema);

module.exports = {
  Band,
  Concert,
  bandSchema,
  concertSchema,
};