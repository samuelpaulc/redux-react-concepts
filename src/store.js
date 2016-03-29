import { createStore } from 'redux';
import reducer from './reducer.js';

let store;

export default function makeStore() {
    if (store) {
        return store;
    }
    store = createStore(reducer); 
    return store;
}
