import makeStore from './store.js';
import React from 'react';
import ReactDOM from 'react-dom';
import { TodoApp } from './TodoApp.js';
import Board from './chess/Board.js';
import { observe } from './chess/Game.js';

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

observe( (knightPosition) => {
        ReactDOM.render(
          <Board knightPosition={knightPosition} />,
          document.getElementById('chess')
        )
    }
);
