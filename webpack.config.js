var webpack = require('webpack');
var CommonsChunkPlugin =require("webpack/lib/optimize/CommonsChunkPlugin");
var HotModuleReplacementPlugin = require('webpack/lib/HotModuleReplacementPlugin');
module.exports = {
    entry: {
        index: [
            './src/js/home/index.js',
            './src/js/home/components/Header.js',
            './src/js/home/components/Option.js',
            './src/js/home/components/Question.js',
        ],
        vendor: [
            'react',
            'react-dom',
            'redux',
            'react-redux',
            'jquery',
            'bootstrap',
            'underscore'
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
                // TODO: ?modules
                loader: "style-loader!css-loader"
            }, {
                test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
                loader: 'url-loader?importLoaders=1&limit=1000&name=/fonts/[name].[ext]'
            }
        ]
    },
    plugins: [
        new CommonsChunkPlugin(
            /* chunkName= */"vendor",
            /* filename= */"vendor.bundle.js",
            Infinity),
        new HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })
    ],
    devServer: {
        hot: true,
        inline: true
    }
};
