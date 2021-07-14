const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")

module.exports = {
  mode: "development",
  entry: "./src/app",

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "WeeklyScheduler",
      template: "./template/index.html",
    }),
  ],
  devtool: "source-map",
}
