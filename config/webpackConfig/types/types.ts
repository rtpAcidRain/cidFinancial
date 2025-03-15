type WConfigMode = 'production' | 'development'

export type WConfigEnv = {
    mode: WConfigMode,
    port: number,
    apiUrl: string,
}

export type WConfigPaths = {
    entry: string,
    build: string,
    html: string,
    src: string,
    locales: string,
    buildLocales: string,
}

export type WConfigOptions = {
    paths: WConfigPaths,
    mode: WConfigMode,
    port: number,
    apiUrl: string,
    isDev: boolean
    project: 'frontend' | 'storybook' | 'jest',
}