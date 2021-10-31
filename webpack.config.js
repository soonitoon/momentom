const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  mode: "development",
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};
