var webpack = require("webpack");
var path = require("path");

module.exports = {
    // 入口文件
    entry: "./js/import-js.js",

    // 输入文件
    output: {
        path: __dirname,
        filename: "compiled.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                loaders: "style-loader!css-loader"
            },
            {
                test: /\.js$/,
                loaders: "babel-loader",
                include: path.join(__dirname, "src")
            }
        ]
    }
};