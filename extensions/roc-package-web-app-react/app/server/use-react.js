import readStats from 'roc-package-web-app-react/lib/helpers/read-stats';
import routes from './router';

/**
 * Enhances a server instance with React support.
 *
 * Extends the options object from _roc-web_. See {@link rocServerOptions} for what the new options are.
 *
 * @example
 * import { createServer } from 'roc-web/app';
 * import { useReact } from 'roc-web-react/app/server';
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
export default function useReact(createServer) {
    return function (options = {}, beforeUserMiddlewares = []) {
        const { stats, createRoutes, createStore, ...serverOptions } = options;

        return createServer(serverOptions, beforeUserMiddlewares.concat(routes({
            createRoutes,
            createStore,
            stats: readStats(stats),
        })));
    };
}
