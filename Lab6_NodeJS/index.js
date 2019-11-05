const express = require("express");
const app = express();

// app.use(express.static(__dirname + "/script.js"));
app.use("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
  res.type("html");
});
app.listen(3000, () => console.log("server started on port 3000"));
