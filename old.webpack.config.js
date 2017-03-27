const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssImport = require('postcss-import');
const cssNext = require('postcss-cssnext');

const ENV = process.env.NODE_ENV;
const isProd = ENV === 'production';
const isDev = ENV === 'development';

const cssLocalName = isDev ? '[path][name]__[local]' : '[hash:base64:5]';

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
    new ExtractTextPlugin({
      filename: '../style/[name].css',
      disable: false,
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    // new webpack.BannerPlugin({
    //   banner: [
    //     "/**",
    //     " * Universal React App v1.0.0",
    //     " *",
    //     " * Copyright 2017, https://github.com/bdeglane",
    //     " * Tous droits réservés.",
    //     " *",
    //     " */"
    //   ].join("\n"),
    //   raw: true, // if true, banner will not be wrapped in a comment
    //   entryOnly: true, // if true, the banner will only be added to the entry chunks
    // })
  ],
  stats: {
    colors: true
  }
};