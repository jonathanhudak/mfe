const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { FederatedTypesPlugin } = require("@module-federation/typescript");
const deps = require("../../package.json").dependencies;

module.exports = {
  entry: "./index.ts",
  mode: "development",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    publicPath: "http://localhost:3001/",
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
      template: "./index.html",
    }),
    new FederatedTypesPlugin({
      federationConfig: {
        name: "app_a",
        filename: "remoteEntry.js",
        exposes: {
          "./Button": "./Button",
        },
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
        },
      },
    }),
  ],
};
