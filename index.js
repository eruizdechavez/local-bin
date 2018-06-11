#!/usr/bin/env node
const express = require('express');
const ngrok = require('ngrok');
const app = express();

app.use(function(req, res) {
  res.send('ok');
});

app.listen(3000, async () => {
  const url = await ngrok.connect(3000);
  console.log('Fake server listening on port 3000');
  console.log(`Public URL: ${url}`);
  console.log('Inspector: http://localhost:4040');
});
