const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    index: "./src/index.js",
    "index.min": "./src/index.js"
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        include: /\.min\.js$/
      })
    ]
  },
  output: {
    path: path.resolve("dist"),
    filename: "[name].js",
    libraryTarget: "commonjs2"
  },
  target: "node",
  module: {
    rules: [
      {
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".js"]
  }
};
