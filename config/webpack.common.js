var helpers = require('./helpers');
var webpack = require('webpack');

const autoprefixer = require('autoprefixer');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');


module.exports = function (options) {
  let ENV = JSON.stringify(options.env);

  return {
    entry: {
      'polyfills': './src/polyfills.ts',
      'vendor': './src/vendor.ts',
      'app': './src/main.ts',
      'vendorStyles': [
        './node_modules/bootstrap/dist/css/bootstrap.css'
      ],
    },
    resolve: {
      extensions: ['*', '.js', '.ts', '.css', '.scss'],
      alias: {
        'ScrollMagicGSAP': 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap',
        'ScrollToPlugin': 'gsap/src/uncompressed/plugins/ScrollToPlugin',
        'EasePack': 'gsap/src/uncompressed/easing/EasePack',
        styles: helpers.root('client', 'assets', 'styles') /* import 'styles/example.scss' */
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
        // Support for CSS as raw text
        // use 'null' loader in test mode (https://github.com/webpack/null-loader)
        // all css in src/style will be bundled in an external css file
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: 'css-loader?postcss-loader'
          })
        },
        {
          test: /\.scss$/,
          use: [
            'to-string-loader',
            'css-loader',
            'sass-loader'
          ],
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
        {}
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
      // Extract css files
      // Reference: https://github.com/webpack/extract-text-webpack-plugin
      new ExtractTextPlugin('site-unseen.css'),
      new webpack.LoaderOptionsPlugin({
        /**
         * PostCSS
         * Reference: https://github.com/postcss/autoprefixer-core
         * Add vendor prefixes to your css
         */
        postcss: [
          autoprefixer({
            browsers: ['last 2 version']
          })
        ]
      }),
    ],
  };
};
