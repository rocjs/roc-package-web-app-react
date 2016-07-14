import readStats from './helpers/readStats';
import reactRouter from './reactRouter';

/**
 * Enhances a server instance with React support.
 *
 * Extends the options object from _roc-web-app_. See {@link rocServerOptions} for what the new options are.
 *
 * @example
 * import { createServer } from 'roc-package-web-app/app';
 * import { useReact } from 'roc-package-web-app-react/app/server';
 *
 * const server = useReact(createServer)({
 *     serve: 'files',
 *     createRoutes: routes,
 *     createStore: store,
 *     stats: './stats.json'
 * });

 * server.start();
 *
 * @param {function} createServer - A createServer function to wrap and add extra functionality to
 * @returns {function} Returns a new createServer that can be used to create server instances that can manage React
 * applications
 */
export default function useReact(createServer, params) {
    return function (options = {}, beforeUserMiddlewares = []) {
        const { stats, createRoutes, createStore, ...serverOptions } = options;

        return createServer(serverOptions, beforeUserMiddlewares.concat(reactRouter({
            ...params,
            createRoutes,
            createStore,
            stats: readStats(stats),
        })));
    };
}
