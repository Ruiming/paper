var webpack = require('webpack');
var CommonsChunkPlugin =require("webpack/lib/optimize/CommonsChunkPlugin");
var HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
module.exports = {
    entry: {
        index: [
            './src/js/home/index.js',
            './src/js/home/components/Header.js',
            './src/js/home/components/Option.js',
            './src/js/home/components/OptionsBar.js',
            './src/js/home/components/Title.js',
        ],
        vendor: [
            'react',
            'react-dom'
        ]
    },
    output: {
        path: './dist',
        filename: 'bundle.js',
        publicPath: '/dist'
    },
    module: {
        loaders: [{
                test: /\.js|jsx$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react'],
                    plugins: ["transform-object-rest-spread"]
                }
            }, {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            }
        ]
    },
    plugins: [
        new CommonsChunkPlugin(
            /* chunkName= */"vendor",
            /* filename= */"vendor.bundle.js",
            Infinity),
        new HotModuleReplacementPlugin()
    ],
    devServer: {
        hot: true,
        inline: true
    }
};
