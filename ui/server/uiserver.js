import dotenv from 'dotenv';
import express from 'express';
import createProxyMiddleware from 'http-proxy-middleware';
import render from './render.jsx';

dotenv.config();

const app = express();

if (!process.env.UI_API_ENDPOINT) {
  process.env.UI_API_ENDPOINT = 'http://localhost:3000/graphql';
}

if (!process.env.UI_AUTH_ENDPOINT) {
  process.env.UI_AUTH_ENDPOINT = 'http://localhost:3000/auth';
}

const apiProxyTarget = process.env.API_PROXY_TARGET;

const port = process.env.UI_SERVER_PORT || 8000;

const enableHMR = process.env.ENABLE_HMR === 'true';

// ----- Hot module replacement in dev mode --------------

if (enableHMR && process.env.NODE_ENV !== 'production') {
  console.log('Adding dev middleware, enabling HMR');

  /* eslint "global-require": "off" */
  /* eslint "import/no-extraneous-dependencies": "off" */
  const webpack = require('webpack');
  const devMiddleware = require('webpack-dev-middleware');
  const hotMiddleware = require('webpack-hot-middleware');

  const config = require('../webpack.config.js')[0];
  config.entry.app.push('webpack-hot-middleware/client');
  config.plugins = config.plugins || [];
  config.plugins.push(new webpack.HotModuleReplacementPlugin());

  const compiler = webpack(config);
  app.use(devMiddleware(compiler));
  app.use(hotMiddleware(compiler));
}

// ------ route handlers and middlewares --------------

app.use(express.static('public'));

if (apiProxyTarget) {
  app.use('/graphql', createProxyMiddleware({
    target: process.env.API_PROXY_TARGET,
  }));
  app.use('/auth', createProxyMiddleware({
    target: process.env.API_PROXY_TARGET,
  }));
}

app.get('/env.js', (_, res) => {
  const env = {
    UI_API_ENDPOINT: process.env.UI_API_ENDPOINT,
    UI_AUTH_ENDPOINT: process.env.UI_AUTH_ENDPOINT,
  };
  res.send(`window.ENV = ${JSON.stringify(env)}`);
});

app.get('*', (req, res, next) => {
  render(req, res, next);
});

app.listen(port, () => {
  console.log(`UI started on port ${port}`);
});

if (module.hot) {
  module.hot.accept('./render.jsx');
}
