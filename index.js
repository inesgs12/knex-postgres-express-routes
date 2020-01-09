const express = require("express");
const apiRoute = require("./routes/api");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
); // this is telling the system what you want to use to parse what is coming into you. Extended true means that you can parse nested objects.

app.use("/api", apiRoute);

app.listen("3000");
