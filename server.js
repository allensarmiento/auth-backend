const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');

const app = express();
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());

const port = 4000;
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
