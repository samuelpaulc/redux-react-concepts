import makeStore from './store.js';

export const store = makeStore();
console.log("initial store=" + store.getState()[0]);
store.subscribe( () => {
    console.log("store=" + store.getState());
});

document.addEventListener('click', (e) => {
    store.dispatch({
        type: 'INCREMENT',
        index: 0
    })
});
