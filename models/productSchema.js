const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
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

});



// create model
const Users = new mongoose.model("Product", productSchema);

module.exports = Users;
