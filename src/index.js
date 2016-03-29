import makeStore from './store.js';
import React from 'react';
import ReactDom from 'react-dom';
import { TodoApp } from './Todo.js';


export const store = makeStore();

const render = () => {
    ReactDom.render(
        <TodoApp {...store.getState()} />,
        document.getElementById('app')
    )
}

render();

console.log("initial store=" + store.getState());
store.subscribe( () => {
    render();
});

