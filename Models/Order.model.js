const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  serviceId: {
    type: String,
  },
  serviceName: {
    type: String,
  },
  price: {
    type: String,
  },
  img: {
    type: String,
  },
  email: {
    type: String,
    },
    phone: {
    type: String,
    },
  customerName: {
    type: String,
    },
    address: {
    type: String,
    },


});
const Order = new mongoose.model('order', orderSchema)
module.exports = Order;