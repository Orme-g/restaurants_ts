const path = require("path");

module.exports = {
    // change to .tsx if necessary
    resolve: {
        alias: {
            Components: path.resolve(__dirname, "src/Components"),
            Pages: path.resolve(__dirname, "whereats-app_TS/restaurants/src/pages/"),
        },
        // changed from extensions: [".js", ".jsx"]
        extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    entry: "./src/app.jsx",
    output: {
        filename: "./bundle.js",
    },

    module: {
        rules: [
            // changed from { test: /\.jsx?$/, use: { loader: 'babel-loader' }, exclude: /node_modules/ },
            { test: /\.(t|j)sx?$/, use: { loader: "ts-loader" }, exclude: /node_modules/ },

            // addition - add source-map support
            { enforce: "pre", test: /\.js$/, exclude: /node_modules/, loader: "source-map-loader" },
        ],
    },
    externals: {
        react: "React",
        "react-dom": "ReactDOM",
    },
    // addition - add source-map support
    devtool: "source-map",
};
