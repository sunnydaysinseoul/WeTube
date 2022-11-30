// It's not webpack converting New JS to Old JS.
// Webpack is running the 'loaders' which are the ones transforming the code.
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  //webpack으로 변환할 원본파일
  entry: {
    main: "./src/client/js/main.js",
    videoPlayer: "./src/client/js/videoPlayer.js",
  },
  mode: "development",
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],
  output: {
    filename: "js/[name].js", //[entry에 있는 name을 가져옴]
    path: path.resolve(__dirname, "assets"), //변환된 파일의 위치
    clean: true,
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
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  //파일 변경될때마다 자동실행되도록
  watch: true,
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 5000,
    poll: 1000,
  },
};
