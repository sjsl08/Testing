const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv")
const connect = require("./dbConnect")
dotenv.config()


app.use(express.json({ limit: "5mb" }));
app.use("/", require("./routes/posts"));

mongoose.set("strictQuery", true);

app.listen(process.env.PORT, async () => {
  await connect()
  console.log("server is running at port ", process.env.PORT);
});
