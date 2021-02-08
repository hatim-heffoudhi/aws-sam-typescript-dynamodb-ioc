import { resolve } from 'path';
import { readdirSync } from 'fs';

import { Configuration, BannerPlugin } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const LAMBDA_DIR = './src/application';

const version =
    process.env.CODEBUILD_RESOLVED_SOURCE_VERSION ||
    require('child_process')
        .execSync('git rev-parse HEAD')
        .toString()
        .trim();

const entry: Record<string, string> = {};
readdirSync(LAMBDA_DIR).forEach(folder => {
    readdirSync(`${LAMBDA_DIR}`).forEach(lambda => {
        entry[lambda] = resolve(LAMBDA_DIR, lambda, 'app.ts');
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
            '@lib': resolve(__dirname, './src/lib'),
            '@domain': resolve(__dirname, './src/domain'),
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin({
            openAnalyzer: false,
            analyzerMode: 'static',
            reportFilename: '../report.html',
        }),
        new BannerPlugin(`Git Version #${version}`),
    ],
};

export default config;
