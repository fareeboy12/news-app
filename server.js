const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/api/news", require("./api/news"));
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
