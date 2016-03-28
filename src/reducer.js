import { updateCounter } from './counterEventHandler.js';

const INITIAL_STATE = [];

export default function reducer (state = INITIAL_STATE, action) {
    switch(action.type) {
        case 'INCREMENT':
            return updateCounter(state, action.index, true);
            break;
        case 'DECREMENT':
            return updateCounter(state, action.index, false);
            break
        default:
            return INITIAL_STATE;
    }
}
