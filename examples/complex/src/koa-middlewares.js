// Used as a silly example how a Koa middlware can acces the Redux store.
// If we have a querystring then counter will on the server be incremented.

// Important that the middlewares yield next for everyting to work correct
export default function middlewares() {
    return [function* (next) {
        if (this.querystring.length > 0) {
            this.state.reduxStore.dispatch({
                type: 'CLICKED'
            });
        }
        yield next;
    }, function* (next) {
        if (this.querystring.length > 0) {
            this.state.reduxStore.dispatch({
                type: 'CLICKED'
            });
        }
        yield next;
    }];
}
