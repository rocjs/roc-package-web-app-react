// Used as a silly example how a Koa middlware can acces the Redux store.
// If we have a querystring then counter will on the server be incremented.

// Important that the middlewares yield next for everyting to work correct

const session = require('koa-session');

export default function middlewares(_, { server }) {
    server.keys = ['secret'];
    return [session(server), function* (next) {
        if (this.path == '/session/') {
            var n = this.session.views || 0;
            this.session.views = ++n;
            this.body = n + ' views';
        } else {
            yield next;
        }

    }, function* (next) {
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
