const express = require('express');
const app = express();

app.use('/api', require('./routes'));

app.listen(4200, () => {
  console.log(`Server running on port 4200`);
});