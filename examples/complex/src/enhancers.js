/* global __NODE__ __DEV__ */

export default function getEnhancers() {
    if (__NODE__) {
        // Add server enhancers here
    } else {
        // Add client enhancers here
    }

    if (__DEV__) {
        // Add dev enhancers here
    }

    return [];
}
