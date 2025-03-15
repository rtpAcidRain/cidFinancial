import webpack from "webpack";
import path from "path";
import { WConfigEnv, WConfigPaths } from "./config/webpackConfig/types/types";
import { createWebpackConfig } from "./config/webpackConfig/createWebpackConfig";

export default (env: WConfigEnv) => {

    const paths: WConfigPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        build: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
        locales: path.resolve(__dirname, 'public', 'locales'),
        buildLocales: path.resolve(__dirname, 'build', 'locales'),
    };

    const mode = env.mode || 'development';
    const port = env.port || 3000;
    const apiUrl = env.apiUrl || 'http://localhost:8082/api/';

    const isDev = mode === 'development';

    const config: webpack.Configuration = createWebpackConfig({
        paths,
        mode,
        port,
        apiUrl,
        isDev,
        project: 'frontend',
    })

    return config
}
