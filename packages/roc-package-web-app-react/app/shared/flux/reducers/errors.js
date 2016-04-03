export default function errors(state = [], action) {
    const { type, error, payload } = action;

    if (type === 'RESET_ERROR_MESSAGES') {
        return [];
    } else if (error) {
        return [
            ...state,
            payload
        ];
    }

    return state;
}
