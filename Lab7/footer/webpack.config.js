const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.js'),
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 3002,
    hot: true
  },
  output: {
    publicPath: 'auto'
  },
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader','css-loader'] }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'footer',
      filename: 'remoteEntry.js',
      exposes: {
        './Footer': './src/footer.js'
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
