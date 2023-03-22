const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define menu item schema
const menuItemSchema = new Schema({
 id: Number,
 name: String,
 price: Number
});



const OrderHistorySchema = new Schema({
 items: [menuItemSchema],
 createdAt: Date,
});

// Create menu item model
const MenuItem = mongoose.model("MenuItem", menuItemSchema);
// Create order history model
const OrderHistory = mongoose.model("OrderHistory", OrderHistorySchema);

module.exports = 
{
 MenuItem, 
 OrderHistory
}