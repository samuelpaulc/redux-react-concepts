import makeStore from './store.js';
import React from 'react';
import ReactDom from 'react-dom';
import Todo from './Todo.js';


export const store = makeStore();

const render = () => {
    ReactDom.render(
        <Todo {...store.getState()} />,
        document.getElementById('app')
    )
}

render();

console.log("initial store=" + store.getState());
store.subscribe( () => {
    render();
});

