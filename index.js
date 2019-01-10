#!/usr/bin/env node
const packageJson = require('./package.json');

const cli = require('cli');
cli.enable('version');
cli.setApp(packageJson.name, packageJson.version);

const open = require('open');

const express = require('express');
const app = express();
const ngrok = require('ngrok');

const options = cli.parse({
  port: [false, 'Local Fake Server Port.', 'int', 3000],
  open: [false, 'Open a browser automatically to local inspector. Requires ngrok.', 'boolean', false],
  'disable-ngrok': [false, 'If present, disable ngrok.', 'boolean', false],
  'ngrok-proto': [false, `ngrok's proto.`, 'string', 'http'],
  'ngrok-auth': [false, `ngrok's auth.`, 'string'],
  'ngrok-subdomain': [false, `ngrok's subdomain.`, 'string'],
  'ngrok-authtoken': [false, `ngrok's authtoken.`, 'string'],
  'ngrok-region': [false, `ngrok's region.`, 'string', 'us'],
  'ngrok-config-path': [false, `ngrok's configPath.`, 'string'],
});

console.log(JSON.stringify(options, null, 2));

app.use(function(req, res) {
  res.send('ok');
});

/**/
app.listen(options.port, async () => {
  const ngrokOptions = {
    proto: options.proto,
  };

  if (options['ngrok-auth']) ngrokOptions.auth = options['ngrok-auth'];
  if (options['ngrok-subdomain']) ngrokOptions.subdomain = options['ngrok-subdomain'];
  if (options['ngrok-authtoken']) ngrokOptions.authtoken = options['ngrok-authtoken'];
  if (options['ngrok-region']) ngrokOptions.region = options['ngrok-region'];
  if (options['ngrok-config-path']) ngrokOptions.configPath = options['ngrok-config-path'];

  console.log(JSON.stringify(ngrokOptions, null, 2));

  const url = options['disable-ngrok'] !== true ? await ngrok.connect(ngrokOptions) : '';

  console.log(`Fake server listening on port ${options.port}`);

  const inspector = 'http://localhost:4040';

  if (options['disable-ngrok'] !== true) {
    console.log(`Public URL: ${url}`);
    console.log(`Inspector: ${inspector}`);
  }

  if (options.open) {
    open(inspector);
  }
});
/**/
