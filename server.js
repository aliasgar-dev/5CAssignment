const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();


app.use(cors());

app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();


require("./app/routes/github.routes")(app);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
