import webpack from 'webpack';
import { WConfigOptions } from './types/types';
function plugins(options: WConfigOptions): webpack.WebpackPluginInstance[] {
    const { isDev, apiUrl } = options

    return [
        new webpack.DefinePlugin({
            __IS_DEV__: isDev,
            __API__: JSON.stringify(apiUrl)
        }),
        new webpack.HotModuleReplacementPlugin({}),
        new webpack.ProgressPlugin()
    ]
}

export default plugins