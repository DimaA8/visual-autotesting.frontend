const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const paths = {
  src: path.resolve(__dirname, "src"),
  dist: path.resolve(__dirname, "dist"),
};

module.exports = {
  context: paths.src,
  entry: {
    app: "./index",
  },

  output: {
    path: paths.dist,
    filename: "[name].bundle.js",
    chunkFilename: "[name].chunk.js",
    publicPath: "/",
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "@Components": path.resolve(__dirname, "src/Components"),
      "@Views": path.resolve(__dirname, "src/Views"),
      "@RouteViews": path.resolve(__dirname, "src/RouteViews"),
      "@Contexts": path.resolve(__dirname, "src/Contexts"),
      "@Assets": path.resolve(__dirname, "src/Assets"),
      "@Classes": path.resolve(__dirname, "src/Classes"),
      "@Api": path.resolve(__dirname, "src/Api"),
      "@Redux": path.resolve(__dirname, "src/Redux"),
      "@Helpers": path.resolve(__dirname, "src/Helpers"),
    },
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    overlay: true,
    hot: true,
    historyApiFallback: true,
  },
  devtool: "inline-source-map",
  optimization: {
    splitChunks: {
      chunks: "all",
      name: "vendor",
    },
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        loader: "awesome-typescript-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpg|jpeg)$/,
        use: {
          loader: "file-loader",
        },
      },
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      process: {
        env: {
          MODE: JSON.stringify(process.env.NODE_ENV) || "development",
        },
      },
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/Php"),
          to: path.resolve(__dirname, "dist"),
        },
        {
          from: path.resolve(__dirname, "src/ServerFiles"),
          to: path.resolve(__dirname, "dist"),
        },
      ],
    }),
    new HtmlWebpackPlugin({
      inject: "body",
      template: path.resolve(__dirname, "src/index.html"),
    }),
  ],
};
