const webpack = require('webpack');

module.exports = {
    configureWebpack: {
        plugins: [
            new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
            new webpack.IgnorePlugin(/^\.\/data$/, /moment-timezone$/)
        ]
    },
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
}