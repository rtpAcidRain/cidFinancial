import { RuleSetRule } from "webpack"
import { WConfigOptions } from "./types/types"
import { babelLoader } from './helpers/babelLoader';

export function loaders(options: WConfigOptions): RuleSetRule[] {

    const codeBabel = babelLoader({ ...options, isTsx: false });
    const tsxCodeBabel = babelLoader({ ...options, isTsx: true });

    const fileLoader = {
        test: /\.(png|jpe?g|gif|woff2|woff)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    };

    return [
        fileLoader,
        codeBabel,
        tsxCodeBabel,
    ];
}