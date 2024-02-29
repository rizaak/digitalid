const express = require("express");
const cors = require("cors");
require('dotenv').config({ path: '../testenv' });

const path = __dirname + '/dist/';


const app = express();

app.use(express.static(path));

app.use(cors());
app.options('*', cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get('*', function (req,res) {
  res.sendFile(path + "index.html");
});

// set port, listen for requests
const PORT = process.env.PORT || 3025;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});