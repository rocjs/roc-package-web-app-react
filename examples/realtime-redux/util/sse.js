export function subscribe(url, onMessage, onOpen, onError) {
    if (!!window.EventSource) {
        const source = new window.EventSource(url);
        if (onMessage) {
            source.addEventListener('message', onMessage);
        }
        if (onOpen) {
            source.addEventListener('open', onOpen);
        }
        if (onError) {
            source.addEventListener('error', onError);
        }

        return source;
    }
}
