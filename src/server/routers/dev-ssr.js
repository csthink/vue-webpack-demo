const path = require('path');
const fs = require('fs');
const Router = require('koa-router');
const axios = require('axios');
const MemoryFs = require('memory-fs');
const webpack = require('webpack');
const VueServerRenderer = require('vue-server-renderer');

const serverConfig = require('../../../build/webpack.server');

const serverCompiler = webpack(serverConfig);
const mfs = new MemoryFs();
serverCompiler.outputFileSystem = mfs;

let bundle;
serverCompiler.watch({}, (err, stats) => {
  if (err) {
    throw err;
  }

  stats = stats.toJson();
  stats.errors.forEach(err => console.log(err));
  stats.warnings.forEach(warn => console.warn(warn));

  const bundlePath = path.join(
    serverConfig.output.path,
    'vue-ssr-server-bundle.json'
  );

  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'));
});

const handleSSR = async (ctx) => {
  if (bundle) {
    const serverBundle = bundle;
  }

  const clientManifestResp = await axios.get(
    'http://127.0.0.1:8000/vue-ssr-client-mainfest.json'
  );

  const clientManifest = clientManifestResp.data;

  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs')
  );

  const render = VueServerRenderer
    .createBundleRenderer(bundle, {
      inject: false,
      clientManifest
    });

}
