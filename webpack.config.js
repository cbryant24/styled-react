const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, "./src/index.html"),
    filename: "index.html",
    inject: "body"
});
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = [{
  name: 'styled-react-npm',
  entry: {
    main: path.join(__dirname, "./lib/index.js"),
    vendor: ["styled-components"],
  },
  watch: false,
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "[name].js",
    library: "styledreact",
    libraryTarget: "commonjs2"
  },
  module: {
      rules: [
          {
              test: /\.(js|jsx)$/,
              use: "babel-loader",
              exclude: /node_modules/
          },
          {
              test: /\.css$/,
              use: ["style-loader", "css-loader"]
          }
      ]
  },
  resolve: {
      extensions: [".js", ".jsx"]
  },
  externals: {
    react: "commonjs2 react",
    "react-dom": "commonjs2 react-dom",
    "styled-components": "commonjs2 styled-components",
    "styled-system": "commonjs2 styled-system"
  },
},
{
  name: 'styled-react-dev',
  context: path.join(__dirname, "./src"),
  entry: path.join(__dirname, "./src/index.js"),
  devtool: 'source-map',
  output: {
    path: path.join(__dirname, "/dist-dev"),
    filename: "[name].js"
  },
  module: {
      rules: [
          {
              test: /\.(js|jsx)$/,
              use: "babel-loader",
              exclude: /node_modules/
          },
          {
              test: /\.css$/,
              use: ["style-loader", "css-loader"]
          }
      ]
  },
  plugins: [htmlWebpackPlugin, new BundleAnalyzerPlugin({analyzerPort: 8889})],
  resolve: {
      extensions: [".js", ".jsx"]
  },
  optimization: {
      splitChunks: {
        chunks: 'all'
      }
  },
  devServer: {
      port: 3001
  }
}];