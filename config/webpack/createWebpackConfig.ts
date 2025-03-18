import webpack from 'webpack';
import { WConfigOptions } from './types/types';
import { resolvers } from './resolvers';
import { plugins } from './plugins';
import { loaders } from './loaders';
import { createDevServer } from './devServer';

export function createWebpackConfig(options: WConfigOptions): webpack.Configuration {
    const { mode, paths, isDev } = options;
    return {
        mode,
        entry: paths.entry,
        output: {
            filename: '[name].[contenthash].js',
            path: paths.build,
            clean: true,
            publicPath: '/',
        },
        plugins: plugins(options),
        module: {
            rules: loaders(options),
        },
        resolve: resolvers(paths),
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: isDev ? createDevServer(options) : undefined,
    };
}
