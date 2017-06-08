const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: {
        index: './src/index.js'
    },
    output: {
        path: path.resolve( __dirname, 'dist' ),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules|odauth/
            },
            {
                use: ['style-loader', 'css-loader'],
                test: /\.css$/
            }
        ]
    },
    plugins: [

        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),

        new CopyWebpackPlugin([
            { from: './src/odauth.js', to: '' },
            { from: './src/callback.html', to: '' }
        ])
    ]
}
