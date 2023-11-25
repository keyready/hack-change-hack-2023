import * as path from 'path';
import { BuildEnv } from './config/build/config/types';
import { buildWebpackConfig } from './config/build/buildWebpackConfig';

export default (env: BuildEnv) => {
    const mode = env.mode || 'development';
    const isDev = mode === 'development';
    const port = env.port || 3000;
    const apiUrl = env.apiUrl || 'http://localhost:8000';

    return buildWebpackConfig({
        mode,
        paths: {
            entry: path.resolve(__dirname, 'src'),
            dist: path.resolve(__dirname, '../client-dist'),
            html: path.resolve(__dirname, 'public/index.html'),
            src: path.resolve(__dirname, 'src'),
            dotenv: path.resolve(__dirname, '../.env'),
            staticFrom: path.resolve(__dirname, './public/static/images'),
            staticTo: path.resolve(__dirname, './client-dist/static/images'),
        },
        isDev,
        port,
        apiUrl,
    });
};
