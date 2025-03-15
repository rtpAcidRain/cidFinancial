import webpack from "webpack"
import { WConfigOptions } from "./types/types"

function loaders(options: WConfigOptions): webpack.RuleSetRule[] {
    return [
        {
            test: /\.(js|ts)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                }
            }
        },
        {
            test: /\.(?:tsx|jsx)$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                }
            }
        }
    ]
}

export default loaders