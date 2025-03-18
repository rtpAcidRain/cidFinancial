import { WConfigOptions } from '../types/types';

interface babelLoaderProps extends WConfigOptions {
    isTsx?: boolean;
}

export function babelLoader({ isDev, isTsx }: babelLoaderProps) {
    return {
        test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: [['@babel/preset-env']],
                plugins: [
                    [
                        '@babel/plugin-transform-typescript',
                        {
                            isTsx,
                        },
                    ],
                ],
            },
        },
    };
}
