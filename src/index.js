import makeStore from './store.js';
import React from 'react';
import ReactDOM from 'react-dom';
import { TodoApp } from './TodoApp.js';
import Board from './chess/Board.js';

// dnd
import { DragSource, DropTarget } from 'react-dnd';
var PropTypes = React.PropTypes;


export const store = makeStore();

const render = () => {
    ReactDOM.render(
        <TodoApp {...store.getState()} />,
        document.getElementById('app')
    )
}

render();

console.log("initial store=" + store.getState());
store.subscribe( () => {
    render();
});

ReactDOM.render(
  <Board knightPosition={[0, 0]} />,
  document.getElementById('chess')
);
