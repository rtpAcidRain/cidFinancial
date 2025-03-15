import webpack from "webpack";
import path from "path";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

type WConfigMode = 'production' | 'development'

type WConfigEnv = {
    mode: WConfigMode,
    port: number,
    apiUrl: string,
}

type WConfigPaths = {
    entry: string,
    build: string,
    html: string,
    src: string,
    locales: string,
    buildLocales: string,
}

type WConfigOptions = {
    paths: WConfigPaths,
    mode: WConfigMode,
    port: number,
    apiUrl: string,
    isDev: boolean
    project: 'frontend' | 'storybook' | 'jest',
}



export default (env: WConfigEnv) => {

    const paths: WConfigPaths = {
        entry: path.resolve(import.meta.dirname, 'src', 'index.tsx'),
        build: path.resolve(import.meta.dirname, 'build'),
        html: path.resolve(import.meta.dirname, 'public', 'index.html'),
        src: path.resolve(import.meta.dirname, 'src'),
        locales: path.resolve(import.meta.dirname, 'public', 'locales'),
        buildLocales: path.resolve(import.meta.dirname, 'build', 'locales'),
    };

    const mode = env.mode || 'development';
    const port = env.port || 3000;
    const apiUrl = env.apiUrl || 'http://localhost:8082/api/';

    const isDev = mode === 'development';

    function babelLoader(isTsx: boolean) {
        return {
            test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['@babel/preset-env'],
                    ],
                    plugins: [
                        [
                            '@babel/plugin-transform-typescript',
                            {
                                isTsx,
                            },
                        ],
                        ['@babel/plugin-transform-runtime']
                    ],
                },
            },
        };
    }

    const babelTsLoader = babelLoader(false);
    const babelTsxLoader = babelLoader(true);

    const config: webpack.Configuration = {
        mode,
        entry: paths.entry,
        output: {
            filename: '[name].[contenthash].js',
            path: paths.build,
            clean: true,
            publicPath: '/',
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: paths.html
            }),
            new webpack.DefinePlugin({
                __IS_DEV__: isDev,
                __API__: JSON.stringify(apiUrl)
            }),
            new webpack.HotModuleReplacementPlugin({}),
            new webpack.ProgressPlugin(),
            new ForkTsCheckerWebpackPlugin(),
            new ForkTsCheckerWebpackPlugin({
                typescript: {
                    diagnosticOptions: {
                        semantic: true,
                        syntactic: true,
                    },
                    mode: 'write-references',
                },
            })
        ],
        module: {
            rules: [
                {
                    test: /\.(png|jpe?g|gif|woff2|woff)$/i,
                    use: [
                        {
                            loader: 'file-loader',
                        },
                    ],
                },
                babelTsLoader,
                babelTsxLoader
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            preferAbsolute: true,
            modules: [paths.src, 'node_modules'],
            alias: {
                '@': paths.src,
            },
        },
        devtool: isDev ? 'inline-source-map' : undefined,
    }

    return config
}
