import React from 'react';
import { Component } from 'react';
import makeStore from './store.js';

let nextTodoId = 0;
let store = makeStore();

const FilterLink = ({
    filter,
    currentFilter,
    children
}) => {
    if (currentFilter === filter) {
        return <span>{children}</span>;
    }
    return (
        <a 
            href='#'
            onClick={
                e => {
                    e.preventDefault();
                    store.dispatch({
                        type: 'SET_VISIBILITY_FILTER',
                        filter: filter
                    })
                }
            }
        >
        {children}
        </a>
    )
}

const getVisibleTodos = (todos, filter) => {
    switch(filter) {
        case 'ALL':
            return todos;
        case 'ACTIVE':
            return todos.filter( t => {
                return !t.completed; 
            });
        case 'COMPLETED':
            return todos.filter( t => {
                return t.completed; 
            });
        default:
            return todos;
    }
}

const TodoView = ({
    onClick,
    completed,
    text
}) => (
    <li
        onClick={onClick}
        style={{
            textDecoration: completed ? 'line-through' : 'none'
        }}>
        {text}
    </li>
);


const TodoListView = ({
    todos,
    onTodoClick
}) => (
    <ul>
        {todos.map(todo =>
            <TodoView 
                key={todo.id}
                {...todo}
                onClick={() => { onTodoClick(todo.id) }} />
        )}
    </ul>
);

export default class Todo extends Component {
    render() {
        const { todos, visibilityFilter } = this.props;
        const visibleTodos = getVisibleTodos(todos, visibilityFilter);
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
                    });
                    this.input.value = '';
                }}>
                Add Todo
                </button>
                <TodoListView
                    todos={visibleTodos}
                    onTodoClick={id => {
                        store.dispatch({
                            type: 'TOGGLE_TODO',
                            id
                        })
                    }}/>

                Show:
                <p>
                    <FilterLink
                        filter='ALL'
                        currentFilter={visibilityFilter}
                        onClick={
                            e => {
                                e.preventDefault();
                                store.dispatch({
                                    type: 'SET_VISIBILITY_FILTER',
                                    filter
                                })
                            }
                        }
                    >
                        All
                    </FilterLink>
                    {' '}
                    <FilterLink
                        filter='ACTIVE'
                        currentFilter={visibilityFilter}
                        onClick={
                            e => {
                                e.preventDefault();
                                store.dispatch({
                                    type: 'SET_VISIBILITY_FILTER',
                                    filter
                                })
                            }
                        }
                    >
                        Active
                    </FilterLink>
                    {' '}
                    <FilterLink
                        filter='COMPLETED'
                        currentFilter={visibilityFilter}
                        onClick={
                            e => {
                                e.preventDefault();
                                store.dispatch({
                                    type: 'SET_VISIBILITY_FILTER',
                                    filter
                                })
                            }
                        }
                    >
                        Completed
                    </FilterLink>
                </p>
            </div>
        );
    }
}
