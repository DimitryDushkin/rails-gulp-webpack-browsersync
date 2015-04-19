/* jshint node: true */

var path = require('path');

module.exports = {
    entry: {
        page: './blocks/page/page.coffee'
    },
    output: {
        publicPath: '/assets/',
        path: path.resolve(__dirname, '../back/app/assets/javascripts/'),
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.coffee$/,
            loader: 'coffee-loader'
        }]
    },
    devtool: 'sourcemap',
    devtoolModuleFilenameTemplate: '[resourcePath]',
    devtoolFallbackModuleFilenameTemplate: '[resourcePath]?[hash]',
};
