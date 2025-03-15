import webpack from 'webpack'
import { WConfigOptions } from './types/types';
import resolvers from './resolvers';
import plugins from './plugins';
import loaders from './loaders';


function createWebpackConfig(options: WConfigOptions): webpack.Configuration {
    const { mode, paths, isDev, apiUrl } = options
    return {
        mode: mode,
        entry: paths.entry,
        devtool: isDev ? 'inline-source-map' : undefined,
        module: {
            rules: loaders(options),
        },
        resolve: resolvers(paths),
        plugins: plugins(options),
        output: {
            filename: '[name].[contenthash].js',
            path: paths.build,
            clean: true,
            publicPath: '/',
        }
    }
}

export default createWebpackConfig;