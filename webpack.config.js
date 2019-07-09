const path = require('path');
const AsyncChunkNames = require('webpack-async-chunk-names-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './src/index.tsx'
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js', '.jsx' ]
    },
    output: {
        filename: 'bundle.js',
        chunkFilename: '[name].js',
        path: path.resolve(__dirname, 'build')
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: false,
                vendor: {
                    name: 'vendor',
                    chunks: 'all',
                    test: /node_modules/
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'TM React Application',
            chunksSortMode: 'none',
            template: './public/index.html',
            favicon: './public/favicon.ico',
            minify: true
        }),
        new AsyncChunkNames()
    ],

    devServer: {
        port: 9000,
        historyApiFallback: true,
        open:true
    }
};