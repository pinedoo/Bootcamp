const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.js'),
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 3000,
    hot: true
  },
  output: {
    publicPath: 'auto'
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        header: 'header@http://localhost:3001/remoteEntry.js',
        footer: 'footer@http://localhost:3002/remoteEntry.js'
      },
      shared: {
        moment: { singleton: true, eager: false, requiredVersion: false }
      }
    }),
    new HtmlWebpackPlugin({
      template: './index.html'
    })
  ]
};
