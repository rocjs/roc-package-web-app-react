const CLICKED = 'CLICKED';

export default function clicker(state = 0, action = {}) {
    if (action.type === CLICKED) {
        return state + 1;
    }

    return state;
}

export function click() {
    return { type: CLICKED };
}
