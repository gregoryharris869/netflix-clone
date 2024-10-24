import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(5001, () => {
  console.log("server is running on http://localhost:5001");
});
