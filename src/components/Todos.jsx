import React from 'react';

async function getTodos() {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
    return res.json();
}

export default async function Todos() {
    const todos = await getTodos();
    return (
        <>
            <h2>Todos</h2>
            {todos.map(todo => (
                <li key={todo.id}>{todo.title}</li>
            ))}
        </>
    );
}