import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export function cssLoader(isDev: boolean) {
    return {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        auto: (resPath: string) =>
                            Boolean(resPath.includes('.module.')),
                        localIdentName: isDev
                            ? '[path][name]__[local]--[hash:base64:5]'
                            : '[hash:base64:8]',
                        namedExport: false,
                    },
                },
            },
            {
                loader: 'postcss-loader',
                options: {
                    postcssOptions: {
                        plugins: [
                            'postcss-preset-env',
                            !isDev && require.resolve('cssnano'),
                        ].filter(Boolean),
                    },
                },
            },
        ],
    };
}
