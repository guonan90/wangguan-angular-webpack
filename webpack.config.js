var htmlWebpackPlugin = require('html-webpack-plugin');
var extractTextPlugin = require('extract-text-webpack-plugin');

var webpack = require('webpack');

module.exports = {
    entry: './src/app.js', //确定项目的入口文件
    output: {
        path: __dirname + '/build', //输出路径，要写绝对路径，__dirname就是当前webpack.config.js所处的绝对路径
        filename: 'app.js' //要输出之后的文件名字
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new extractTextPlugin({
            filename: 'app.css',
            allChunks: true
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        })

    ],
    module: {
        loaders: [{
                test: require.resolve("jquery"),
                loader: "expose-loader?$!expose-loader?jQuery"
            },
            {
                test: require.resolve("./src/js/pagerHaper"),
                loader: "expose-loader?BPDefaultOptions"
            },  
            {
                test: require.resolve("echarts"),
                loader: "expose-loader?echarts"
            }, 
            {
                test: /\.(less|css)$/,
                loader: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader!less-loader'
                })
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'
            },
            {
                test: /\.html$/,
                loader: 'html-withimg-loader'
            }
        ]
    }
}