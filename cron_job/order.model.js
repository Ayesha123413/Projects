import mongoose from "mongoose";

//define structure of collection
const userSchema = new mongoose.Schema({
  cust_id: Number,

  qty: Number,

  amount: Number,
});

//create collection
const Order = mongoose.model("orders", userSchema);
export default Order;
