import { Configuration } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { resolve } from 'path';
import { readdirSync } from 'fs';

const APPLICATIONS = './src/application';
const MAIN = 'app.ts';
const entry: Record<string, string> = {};
readdirSync(APPLICATIONS).forEach(folder => {
    readdirSync(`${APPLICATIONS}`).forEach(application => {
        entry[application] = resolve(APPLICATIONS, application, MAIN);
    });
});

const config: Configuration = {
    entry,
    output: {
        filename: '[name]/app.js',
        path: resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs',
    },
    target: 'node',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    externals: ['aws-sdk'],
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            '@domain': resolve(__dirname, './src/domain'),
            '@config': resolve(__dirname, './src/zconfig'),
        },
    },
    plugins: [
        new CleanWebpackPlugin()
    ],
};

export default config;
