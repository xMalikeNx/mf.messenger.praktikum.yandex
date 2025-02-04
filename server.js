const express = require('express');
const path = require('path');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, './dist')));
app.use(express.json());

app.get('/test', (req, res) => {
  if (
    JSON.parse(req.query.name) === 'Maliken' &&
    JSON.parse(req.query.age) === 22
  ) {
    return res.send('ok');
  }
  res.send('failed');
});

app.post('/test', (req, res) => {
  const { body = {} } = req.body;
  if (body.name === 'Maliken' && body.age === 22) {
    return res.send('ok');
  }
  res.send('failed');
});

app.put('/test/:id', (req, res) => {
  const { body = {} } = req.body;
  if (body.name === 'New name' && req.params.id === '10') {
    return res.send('ok');
  }
  res.send('fail');
});

app.delete('/test/:id', (req, res) => {
  if (req.params.id === '10') {
    return res.send('ok');
  }
  res.send('fail');
});

app.get('*', (req, res) => {
  if (!/(.js|.css|.ttf|.svg|.png|.jpg)$/.test(req.path)) {
    if (req.path.includes('/js')) {
      return res.sendFile(path.join(__dirname, './dist' + req.path + '.js'));
    }

    return res.sendFile(path.join(__dirname, './dist/index.html'));
  }
});

const server = process.env.PORT
  ? app
  : https.createServer(
      {
        key: fs.readFileSync(path.resolve(__dirname, './security/key.pem')),
        cert: fs.readFileSync(path.resolve(__dirname, './security/cert.pem')),
      },
      app
    );

server.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
