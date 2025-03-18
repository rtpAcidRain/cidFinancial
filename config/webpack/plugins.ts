import webpack from 'webpack';
import { WConfigOptions } from './types/types';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export function plugins(options: WConfigOptions): webpack.WebpackPluginInstance[] {
    const { isDev, apiUrl, project, paths } = options;

    return [
        new HtmlWebpackPlugin({
            template: paths.html,
        }),
        new webpack.DefinePlugin({
            __IS_DEV__: JSON.stringify(isDev),
            __API__: JSON.stringify(apiUrl),
            __PROJECT__: JSON.stringify(project),
        }),
        new webpack.HotModuleReplacementPlugin({}),
        new webpack.ProgressPlugin(),
    ];
}
