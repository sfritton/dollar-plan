const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require("webpack");
const path = require("path");

module.exports = merge(common, {
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
    publicPath: "http://localhost:8080/built/"
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(new RegExp("^(ipc)$"))
  ],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist/built"),
    publicPath: "http://localhost:8080/built"
  }
});
