import express from "express";
import mongoose from "mongoose";
import Order from "./order.model.js";
import cron from "node-cron";

const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
mongoose
  .connect("mongodb://localhost:27017/Nodetest", { useNewUrlParser: true })
  .then(() => {
    console.log("database Connected");
  })
  .catch((error) => {
    console.log("error occured ", error.message);
  });
app.use(express.urlencoded({ extended: false }));

//CRON JOB
/*cron.schedule("* * * * * *", function () {
  console.log("cron is running");
});*/

//creat document in collection
app.post("/create", async (req, res) => {
  const { cust_id, qty, amount } = req.body;
  console.log("create is running", req.body);
  await Order.create(req.body);
  res.json({
    message: "record saved",
  });
});

//AGGREGATION  , video to watch for help(https://www.youtube.com/watch?v=b48fr8Pnqdw)
app.get("/aggregation", async (req, res) => {
  const order = await Order.find();

  const result = await Order.aggregate([
    { $match: { cust_id: 1 } },
    { $group: { _id: "$cust_id", total: { $sum: "$amount" } } },
  ]);
  res.send(order);
  console.log(result);
});
app.listen(port, () => {
  console.log("we are listening  port " + port);
});
