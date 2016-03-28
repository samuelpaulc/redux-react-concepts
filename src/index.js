import makeStore from './store.js';
import React from 'react';
import { Component } from 'react';
import ReactDom from 'react-dom';

export const store = makeStore();

let nextTodoId = 0;
class Todo extends Component {
    render() {
        return (
            <div>
                <input ref={ node => {
                        this.input = node;
                    }} />
                <button onClick={() => {
                    store.dispatch({
                        type: 'ADD_TODO',
                        text: this.input.value || 'Test',
                        id: nextTodoId++
                    })
                }}>
                Add Todo
                </button>
                <ul>
                    {this.props.todos.map(todo => 
                        <li key={todo.id}
                            onClick={ () => {
                                    store.dispatch({
                                        type: 'TOGGLE_TODO',
                                        id: todo.id
                                    });
                                }
                            }
                            style={{
                                textDecoration: todo.completed ? 'line-through' : 'none'
                            }}>
                            {todo.text}
                        </li>
                    )}
                </ul>
            </div>
        );
    }
}

const render = () => {
    ReactDom.render(
        <Todo todos={store.getState().todos || []} />,
        document.getElementById('app')
    )
}

render();

console.log("initial store=" + store.getState());
store.subscribe( () => {
    render();
});

