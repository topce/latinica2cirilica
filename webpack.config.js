const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './bootstrap.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bootstrap.js',
  },
  mode: 'development',
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        'index.html',
        'manifest.json',
        'service-worker.js',
        'favicon.ico',
        'favicons/*.png',
        'icons/*.png',
        'launch-screens/*.png',
      ],
    }),
  ],
  experiments: {
    asyncWebAssembly: true,
  },
};
