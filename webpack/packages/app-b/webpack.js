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
    publicPath: "http://localhost:3002/",
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
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
        name: "app_b",
        filename: "remoteEntry.js",
        remotes: {
          app_a: "app_a@http://localhost:3001/remoteEntry.js",
        },
        exposes: {},
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
