var helpers = require('./helpers');
var webpack = require('webpack');

const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');


module.exports = function (options) {
  let ENV = JSON.stringify(options.env);

  return {
    entry: {
      'polyfills': './src/polyfills.ts',
      'vendor': './src/vendor.ts',
      'app': './src/main.ts'
    },
    resolve: {
      extensions: ['*', '.js', '.ts'],
      alias: {
        'ScrollMagicGSAP': 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap',
        'ScrollToPlugin': 'gsap/src/uncompressed/plugins/ScrollToPlugin',
        'EasePack': 'gsap/src/uncompressed/easing/EasePack',
        styles: helpers.root('client', 'assets', 'styles') /* import '~styles/example.scss' */
      }
    },
    module: {
      loaders: [
        {
          test: /\.ts$/,
          loaders: [
            'awesome-typescript-loader',
            'angular-router-loader',
            'angular2-template-loader'
          ]
        },
        {
          test: /\.html$/,
          use: 'raw-loader',
          exclude: [helpers.root('src/index.html')]
        },
        {
          test: /\.css$/,
          use: ['to-string-loader', 'css-loader'],
        },
        {
          test: /\.scss$/,
          use: ['to-string-loader', 'css-loader', 'sass-loader'],
          // NOTE: no such file or directory '**/node_modules/node-sass/vendor'
          // node node_modules/node-sass/scripts/install.js
        },
        {
          test: /\.js/,
          use: 'imports-loader?define=>false'
        },
        {
          test: /\.(otf|ttf|eot|woff2?|ico|svg)$/,
          loader: 'file-loader?name=assets/bundles/[name].[hash].[ext]'
        },
      ]
    },
    plugins: [
      new DefinePlugin({
        'ENV': ENV,
        'process.env.ENV': ENV,
        'process.env.NODE_ENV': ENV,
      }),
      new CommonsChunkPlugin({
        names: ['app', 'vendor', 'polyfills'],
      }),
      new ContextReplacementPlugin(
        /angular(\\|\/)core/, // (\\|\/) for *nix and Windows
        helpers.root('./src'), // location of your src
        { }
      ),
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        inject: 'body',
        title: 'Angular Nimble Starter',
        favicon: 'client/assets/images/favicon.png',
        showErrors: true
      }),
      new ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default'],
        // In case you imported plugins individually, you must also require them here:
        // Util: "exports-loader?Util!bootstrap/js/dist/util",
        // Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
      }),
    ],
  };
};
