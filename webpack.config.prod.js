import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
    debug: true,
    devtool: 'source-map',
    noInfo: false,
    entry: {
        main: path.resolve(__dirname, 'src/index'),
        vendor: path.resolve(__dirname, 'src/vendor')
    },
    target: 'web',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].[chunkhash].js'
    },
    plugins: [
        //generate extrenat css file with hash in name
        new ExtractTextPlugin('[name].[chunkhash].css'),
        //hash in files for cache busting
        new WebpackMd5Hash(),
        //creates a seperate bundle
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        //Create HTML file that inclues reference to bundle.js
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStylesLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            inject: true,
            trackJSToken: '642071026b514e7fbab954ad53392d5e'

        }),
        //Eliminates duplicate packages when generating bundle
        new webpack.optimize.DedupePlugin(),
        //Minify JS
        new webpack.optimize.UglifyJsPlugin()
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: ['babel']
        }, {
            test: /\.css$/,
            loaders: ExtractTextPlugin.extract('css?sourceMap')
        }]
    }
}
