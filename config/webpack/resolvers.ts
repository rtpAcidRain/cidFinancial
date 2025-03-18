import { ResolveOptions } from 'webpack';
import { WConfigPaths } from './types/types';

export function resolvers(paths: WConfigPaths): ResolveOptions {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        preferAbsolute: true,
        modules: [paths.src, 'node_modules'],
        alias: {
            '@': paths.src,
        },
    };
}
