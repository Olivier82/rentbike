const webpack = require('webpack');
const path = require('path');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
    entry: './js/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: './bundle.js'
    },
    watch: true,
    mode: 'development',
    devServer: {
        contentBase: './'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new WriteFilePlugin(),
    ],
    devtool: 'source-map'
};