const express = require('express');

const PORT: number | string = process.env.PORT || 8080;
const app = express();

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}!`);
});
