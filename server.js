const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const authRoutes = require('./routes/auth.routes');
const homeRoutes = require('./routes/home.routes');

const app = express();
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/', homeRoutes);

const port = 4000;
app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
