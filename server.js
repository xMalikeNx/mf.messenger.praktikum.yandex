const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.static(path.join(__dirname, './static')));

app.get('*', (req, res) => {
  return res.status(404).send('404 not found');
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
