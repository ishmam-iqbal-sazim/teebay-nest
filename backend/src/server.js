import express from "express";

const app = express();

app.get("/", (req, res) => {
  console.log("hello from express");
  res.json({ message: "hello" });
});

export { app };
