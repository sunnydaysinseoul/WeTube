// It's not webpack converting New JS to Old JS.
// Webpack is running the 'loaders' which are the ones transforming the code.

const path = require("path");

module.exports = {
  entry: "./src/client/js/main.js", //webpack으로 변환할 원본파일
  mode: "development",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "assets", "js"), //변환된 파일의 위치
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
    ],
  },
  //파일 변경될때마다 자동실행되도록
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 5000,
    poll: 1000,
  }
};
