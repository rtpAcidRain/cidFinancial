import webpack from "webpack"
import { WConfigPaths } from "./types/types"

function resolvers(paths: WConfigPaths): webpack.ResolveOptions {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        preferAbsolute: true,
        modules: [paths.src, 'node_modules'],
        alias: {
            '@': paths.src,
        },
    }
}

export default resolvers