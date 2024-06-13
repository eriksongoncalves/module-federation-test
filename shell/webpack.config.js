const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "http://localhost:9001/",
  },
  resolve: {
    extensions: [".jsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: [/node_modules/],
        include: path.resolve(__dirname, "src"),
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        exclude: [/node_modules/],
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "./public/index.html"),
    }),
    new ModuleFederationPlugin({
      name: "App",
      exposes: {
        "./AuthHook": "./src/AuthHook",
      },
      remotes: {
        App: "App@http://localhost:9001/remoteEntry.js",
        HomeApp: "HomeApp@http://localhost:9002/remoteEntry.js",
        ContactApp: "ContactApp@http://localhost:9003/remoteEntry.js",
      },
      shared: {
        react: {
          singleton: true,
          eager: true,
          requiredVersion: "^18.3.1",
        },
        "react-dom": {
          singleton: true,
          eager: true,
          requiredVersion: "^18.3.1",
        },
        "react-router-dom": {
          singleton: true,
          eager: true,
          requiredVersion: "^5.3.0",
        },
      },
    }),
  ],
  devServer: {
    host: "localhost",
    port: 9001,
    static: {
      directory: path.resolve(__dirname, "dist"),
    },
    historyApiFallback: true,
  },
};
