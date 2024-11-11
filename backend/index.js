const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("connected to database"))
  .catch((error) => console.log(error.message));

app.use(userRoute);

app.get("/", (req, res) => {
  res.json({ message: "this route does not esist go to /users" });
});

app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`);
});
