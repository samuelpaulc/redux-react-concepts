import React from 'react';
import { Component } from 'react';
import makeStore from './store.js';

let nextTodoId = 0;
let store = makeStore();

const FilterLink = ({
    filter,
    currentFilter,
    children,
    onClick
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
                    onClick(filter);
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

// component needs to have a single root element hence wrapping with a div
const AddTodo = ({
    onAddClick
}) => {
    let input;
    return (
        <div>
            <input ref={ node => {
                input = node;
            }} />
            <button onClick={() => {
                onAddClick(input.value || 'Test');
                input.value = '';
            }}>
            Add Todo
            </button>
        </div>
    );
};

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

const Footer = ({
    visibilityFilter,
    onFilterClick
}) => (
    <p>
        <FilterLink
            filter='ALL'
            currentFilter={visibilityFilter}
            onClick={onFilterClick}
        >
            All
        </FilterLink>
        {' '}
        <FilterLink
            filter='ACTIVE'
            currentFilter={visibilityFilter}
            onClick={onFilterClick}
        >
            Active
        </FilterLink>
        {' '}
        <FilterLink
            filter='COMPLETED'
            currentFilter={visibilityFilter}
            onClick={onFilterClick}
        >
            Completed
        </FilterLink>
    </p>
);

// Container Component
// export default class Todo extends Component {
export const TodoApp = ({
    todos,
    visibilityFilter
}) => (
    <div>
        <AddTodo
            onAddClick={text => {
                store.dispatch({
                    type: 'ADD_TODO',
                    id: nextTodoId++,
                    text
                });
            }
        } />
        <TodoListView
            todos={getVisibleTodos(
                    todos,
                    visibilityFilter
                )
            }
            onTodoClick={id => {
                store.dispatch({
                    type: 'TOGGLE_TODO',
                    id
                })
            }}/>

        Show:
        <Footer
            visibilityFilter={visibilityFilter}
            onFilterClick={filter =>
                store.dispatch({
                    type: 'SET_VISIBILITY_FILTER',
                    filter
                })
            }
        />
    </div>
)
