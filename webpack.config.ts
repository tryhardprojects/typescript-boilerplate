import path from "path";
import webpack from "webpack";
import HtmlWebPackPlugin from "html-webpack-plugin";
import ExtractTextPlugin from "extract-text-webpack-plugin";

const extractTextPlugin = new ExtractTextPlugin({
    filename: "css/test.css",
});

const config: webpack.Configuration = {
    // defaults to ./src
    // Here the application starts executing
    // and webpack starts bundling
    entry: {
        testScript: "./src/scripts/test.ts",
    },
    // options related to how webpack emits results
    output: {
        // the target directory for all output files
        // must be an absolute path (use the Node.js path module)
        path: path.join(__dirname, "clientBuild"),
        // the filename template for entry chunks
        filename: "scripts/[name].js",
    },
    resolve: {
        extensions: [".js", ".jsx", ".css", ".ts"], // add your other extensions here
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader",
                }),
            },
            {
                test: /\.html$/,
                use: [{
                    loader: "html-loader",
                }],
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "assets/[hash].[ext]",
                            publicPath: "../",
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        extractTextPlugin,
        new HtmlWebPackPlugin({
            template: "./src/html/test.html",
            filename: "html/test.html",
        }),
    ],
    devServer: {
        open: true,
        openPage: "html/test.html",
        writeToDisk: true,
        proxy: {
            "/api": "http://localhost:3000/",
        },
    },
};

export default config;
