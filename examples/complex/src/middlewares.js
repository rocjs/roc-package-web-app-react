/* global __NODE__ __DEV__ */

export default function getMiddlewares() {
    if (__NODE__) {
        // Add server middlewares here
    } else {
        // Add client middlewares here
    }

    if (__DEV__) {
        // Add dev middlewares here
    }

    return [];
}
