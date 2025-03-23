import { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import { WConfigOptions } from './types/types';

export function createDevServer(
    options: WConfigOptions,
): DevServerConfiguration {
    return {
        port: options.port,
        open: true,
        historyApiFallback: true,
        hot: true,
        client: {
            overlay: {
                runtimeErrors: (error: Error) => {
                    if (error.message.includes('ResizeObserver loop')) {
                        return false;
                    }
                    return true;
                },
            },
            progress: true,
        },
    };
}
