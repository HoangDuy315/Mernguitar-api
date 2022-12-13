const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      desc: {
        type: String,
      },
      imgUrl: {
        type: String,
      },
      pro: {
        type: [String]
      }



})

module.exports = mongoose.model('DataGuitar', dataSchema)