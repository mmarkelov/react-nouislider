const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const reactNoUiSlider = path.resolve('../src');
const react = path.resolve('../node_modules/react');
const reactDOM = path.resolve('../node_modules/react-dom');

const vendor = ['react', 'react-dom'];

module.exports = (env) => {
  const isDebug = !env.production;
  return {
    devtool: isDebug ? "source-map" : "hidden-source-map",

    devServer: {
      open: true,
      compress: true,
      port: 3004,
    },

    entry: {
      vendor,
      index: "./src/index.js",
    },

    output: {
      path: path.join(__dirname, "/build"),
      publicPath: isDebug ? "/" : "/react-nouislider/",
      filename: isDebug ? "[name].js" : "static/js/[name].[chunkhash:8].js",
    },

    resolve: {
      alias: {
        "nouislider-react": reactNoUiSlider,
        react,
        "react-dom": reactDOM,
      },
    },

    cache: isDebug,

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env", "@babel/preset-react"],
                plugins: [
                  "@babel/plugin-proposal-class-properties",
                  "@babel/plugin-proposal-object-rest-spread",
                ],
              },
            },
          ],
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: "html-loader",
              options: { minimize: true },
            },
          ],
        },
        {
          test: /\.(gif|png|svg|jpe?g)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "static/assets/[name].[hash:8].[ext]",
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: "./public/index.html",
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
      }),
    ],
  };
};
