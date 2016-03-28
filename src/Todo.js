import React from 'react';
import { Component } from 'react';

let nextTodoId = 0;

export default class Todo extends Component {
    render() {
        return (
            <div>
                <input ref={ node => {
                        this.input = node;
                    }} />
                <button onClick={() => {
                    this.props.store.dispatch({
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
                                    this.props.store.dispatch({
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
