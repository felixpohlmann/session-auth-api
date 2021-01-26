const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//routes
const authRouter = require("./routes/auth.router");
app.use("/api/auth", authRouter);

const postsRouter = require("./routes/posts.router");
app.use("/api/posts", postsRouter);

//controllers
const dbController = require("./controllers/db.controller");

app.get("/", (req, res) => {
  res.send("TODO-API v1.0").end();
});

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Server now listening in port ${PORT}`);
});

//db init
dbController.connect();
