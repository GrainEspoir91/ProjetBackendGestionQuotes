require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", require("./routes/auth"));
app.use("/authors", require("./routes/authors"));
app.use("/domains", require("./routes/domains"));
app.use("/quotes", require("./routes/quotes"));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log("API running on port " + port));
