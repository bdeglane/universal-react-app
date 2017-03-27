const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssImport = require('postcss-import');
const cssNext = require('postcss-cssnext');

const ENV = process.env.NODE_ENV || 'development';
const isProd = ENV === 'production';
const isDev = ENV === 'development';

const cssLocalName = isDev ? '[path][name]__[local]' : '[hash:base64:5]';

module.exports = {
  entry: path.resolve(path.join(__dirname, 'src', 'client.js')),
  output: {
    path: path.resolve(path.join(__dirname, 'src', 'static', 'js')),
    publicPath: path.resolve(path.join(__dirname, 'src', 'static')),
    filename: '[name].js'
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.json',
      '.css',
      '.jpg'
    ]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{loader: 'babel-loader'}]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract([
          {
            loader: 'css-loader',
            // this must be `query`. if it is `option` the imported classNames are all `undefined`.
            query: {
              modules: true,
              sourceMap: isDev,
              minimize: isProd,
              localIdentName: cssLocalName
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  cssImport(),
                  // use css4
                  cssNext({
                    browsers: ['last 2 versions', '> 5%']
                  })
                ]
              }
            }
          }
        ])
      }
    ]
  },
  devtool: "source-map",
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        // this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf('node_modules') !== -1;
      }
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: true,
    //   compress: {
    //     warnings: true,
    //     drop_console: true,
    //   },
    //   //include: /\.min\.js$/,
    //   minimize: false
    // }),
    new ExtractTextPlugin({
      filename: '../style/[name].css',
      disable: false,
      allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(ENV)
      }
    }),
    new webpack.BannerPlugin({
        banner: [
          "/**",
          " * West Track Story App v1.0.0",
          " *",
          " * Copyright 2017, Netapsys Atlantique",
          " * Tous droits réservés.",
          " *",
          " */"
        ].join("\n"),
        raw: true, // if true, banner will not be wrapped in a comment
        entryOnly: true, // if true, the banner will only be added to the entry chunks
      }
    )
  ]
};