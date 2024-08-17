const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const AddMetaPlugin = require("./plugins/add-meta-plugin");

const path = require("path");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      // meta: {
      //   viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
      //   keyword: "webpack",
      // },
    }),
    new AddMetaPlugin({
      meta: {
        title: "webpack App",
        keyword: "webpack",
      },
    }),
  ],
  resolveLoader: {
    // loader路径查找顺序从左往右
    modules: ["node_modules", "./loaders"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "adapt-console-loader",
            options: {
              prefix: "走上人生巅峰",
            },
          },
          {
            loader: "adapt-console-loader",
            options: {
              prefix: "升职加薪",
            },
          },
        ],
      },
    ],
  },
};
