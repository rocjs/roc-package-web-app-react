import { appConfig } from 'roc-package-web-app-react/app/shared';

const STOCK_LOAD = 'STOCK_LOAD';
const STOCK_REMOVE = 'STOCK_REMOVE';
const STOCK_LOAD_ERROR = 'STOCK_LOAD_ERROR';

function createGraph(name, event, point) {
    const index = [point];
    const times = [];

    for (let i = 1; i <= 15; i++) {
        times.push(i);
    }

    return { ...event, index, times };
}

function updateGraph(event, graph, point) {
    const index = [...graph.index];
    const times = [...graph.times];

    index.push(point);

    return { ...event, index: index.slice(-15), times };
}

export default function reducer(
        state = { data: { graphs: {}, events: []}, errors: [] },
        action = { data: [], errors: [] }
    ) {
    if (action.type === STOCK_LOAD) {
        // get copy of action data
        const newEvents = [ ...action.data ];

        // get copy of existing events
        const events = [...state.data.events];

        // get copy of current graph data
        const graphs = {...state.data.graphs };

        // the tickers we want to generate graph data for from configuration
        const tickersToGraph = appConfig.collect;

        for (const event of newEvents) {
            // build event key, used by react motion
            event.key = event.TICKER + event.LAST + event.TIME;

            // ignore identical events
            if (state.data.events.find(e => e.key === event.key)) {
                continue;
            }

            // add to events
            events.unshift(event);

            // graph ticker if configured
            if (tickersToGraph.indexOf(event.TICKER) > -1) {
                const graph = graphs[event.TICKER];
                const graphPoint = parseFloat(event.LAST.toFixed(2));

                if (graph) {
                    graphs[event.TICKER] = updateGraph(event, graph, graphPoint);
                } else {
                    graphs[event.TICKER] = createGraph(event.TICKER, event, graphPoint);
                }
            }
        }

        return {
            ...state,
            errors: [],
            data: {
                graphs,
                events: events.slice(0,9)
            }
        };
    } else if (action.type === STOCK_LOAD_ERROR) {
        const errors = [ ...action.errors ];
        const errorTexts = [];

        for (const error of errors) {
            if (error.message) {
                errorTexts.push(error.message);
            } else {
                errorTexts.push(error);
            }
        }

        return {
            ...state,
            data: {},
            errors: errorTexts
        };
    }

    return state;
}

export function stockLoad(data) {
    return { type: STOCK_LOAD, data };
}

export function stockError(errors) {
    return { type: STOCK_LOAD_ERROR, errors };
}
