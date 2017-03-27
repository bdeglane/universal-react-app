var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    //app: ['babel-polyfill', path.join(__dirname, 'src', 'client.js')],
    app: path.join(__dirname, 'src', 'client.js'),
    vendor: ['react', 'react-dom']
  },
  output: {
    path: path.join(__dirname, 'src', 'static', 'js'),
    filename: 'main.js',
    publicPath: path.join('static')
  },
  resolve: {
    extensions: [
      '',
      '.js',
      '.json',
      '.css'
    ]
  },
  module: {
    loaders: [
      {
        test: /\.(css|scss|sass)$/,
        // loaders: ["style-loader", "css-loader", "sass-loader"]
        loader: ExtractTextPlugin.extract("css-loader!sass-loader")
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        plugins: ['transform-runtime'],
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      {
        test: /\.json$/,
        loaders: [
          "json",
        ]
      }
    ]
  },
  plugins: [
    // Avoid publishing files when compilation fails
    //new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('../style/style.css', {
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new webpack.BannerPlugin({
      banner: [
        "/**",
        " * Universal React App v1.0.0",
        " *",
        " * Copyright 2017, https://github.com/bdeglane",
        " * Tous droits réservés.",
        " *",
        " */"
      ].join("\n"),
      raw: true, // if true, banner will not be wrapped in a comment
      entryOnly: true, // if true, the banner will only be added to the entry chunks
    })
  ],
  stats: {
    colors: true
  }
};