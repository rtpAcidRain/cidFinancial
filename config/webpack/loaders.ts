import { RuleSetRule } from 'webpack';
import { WConfigOptions } from './types/types';
import { babelLoader } from './helpers/babelLoader';
import { cssLoader } from './helpers/cssLoader';

export function loaders(options: WConfigOptions): RuleSetRule[] {
    const codeBabel = babelLoader({ ...options, isTsx: false });
    const tsxCodeBabel = babelLoader({ ...options, isTsx: true });
    const codeCss = cssLoader(options.isDev);

    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    };

    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff2|woff)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    };

    return [fileLoader, svgLoader, codeBabel, tsxCodeBabel, codeCss];
}
