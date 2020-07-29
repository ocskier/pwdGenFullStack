const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const apiRoutes = require('./routes/apiRoutes');

const PORT: number | string = process.env.PORT || 8080;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

app.use(express.static('public'));

app.use(apiRoutes);

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}!`);
});
