const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");

module.exports = {
  entry: "./src/client/index",
  mode: "development",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.scss|sass$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader", // compiles Sass to CSS, using Node Sass by default
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Codamit [WDS] - [HMR]",
      template: path.resolve(__dirname, "src", "client", "index.html"),
    }),
    new WriteFilePlugin(),
    new CopyWebpackPlugin([
      {
        from: "node_modules/bulma/css/bulma.min.css",
        to: "assets/css/bulma.min.css",
      },
      {
        from: "src/client/assets",
        to: "assets",
      },
    ]),
  ],
  devServer: {
    historyApiFallback: true,
  },
};
