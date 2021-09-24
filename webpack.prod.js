const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const { optimize } = require('webpack');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");




module.exports = {
    entry: './src/client/app.js',
    output: {
        libraryTarget: 'var',
        library: 'Client'
    },
    mode: 'production',
    optimization: {
        minimizer: [new TerserPlugin({}), new CssMinimizerPlugin(),]
    },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
            },
            {
                test: /\.(png|jpe?g|jpg|gif)$/i,
                loader: 'file-loader',
                options: {
                    outputPath: 'images',
                },
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      mimetype: false,
                    },
                  },
                ],
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
              },
              {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
              },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/client/views/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
        // new WorkboxPlugin.GenerateSW()
       
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
      }
}
