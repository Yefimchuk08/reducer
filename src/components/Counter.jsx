import { useState } from 'react';
import { useTodos } from './TodoContext';
import './Todo.css';

function Counter() {
    const [text, setText] = useState('');
    const [filter, setFilter] = useState('all');
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');

    const { state, dispatch } = useTodos();

    const addTodo = () => {
        if (text.trim() !== '') {
            dispatch({ type: 'todoAdded', payload: text });
            setText('');
        }
    };

    const startEdit = (todo) => {
        setEditingId(todo.id);
        setEditText(todo.text);
    };

    const saveEdit = () => {
        if (editText.trim() !== '') {
            dispatch({ type: 'todoEdited', payload: { id: editingId, text: editText } });
            setEditingId(null);
            setEditText('');
        }
    };

    const clearCompleted = () => {
        dispatch({ type: 'clearCompleted' });
    };

    const getFilteredTodos = () => {
        switch (filter) {
            case 'active':
                return state.todos.filter((todo) => !todo.completed);
            case 'completed':
                return state.todos.filter((todo) => todo.completed);
            default:
                return state.todos;
        }
    };

    return (
        <div className="todo-container">
            <h1>notebook of death</h1>
            <div className="state-buttons">
                <button onClick={() => setFilter("all")}>All</button>
                <button onClick={() => setFilter("active")}>Active</button>
                <button onClick={() => setFilter("completed")}>Completed</button>
                <button onClick={clearCompleted}>Clear Completed</button>
            </div>

            <div className="todo-input">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Додати завдання..."
                />
                <button onClick={addTodo}>Додати</button>
            </div>

            <ul>
                {getFilteredTodos().map((todo) => (
                    <li key={todo.id} className={todo.completed ? 'completed' : ''}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() =>
                                dispatch({ type: 'todoToggled', payload: todo.id })
                            }
                        />

                        {editingId === todo.id ? (
                            <>
                                <input
                                    type="text"
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                />
                                <button onClick={saveEdit}>Зберегти</button>
                            </>
                        ) : (
                            <>
                                <span onClick={() => startEdit(todo)}>{todo.text}</span>
                                <button onClick={() => startEdit(todo)}>Редагувати</button>
                            </>
                        )}

                        <button
                            className="remove"
                            onClick={() =>
                                dispatch({ type: 'todoRemoved', payload: todo.id })
                            }
                        >
                            ✖
                        </button>
                    </li>
                ))}
            </ul>
            <div className="todo-counts">
                <p>{state.todos.filter(todo => !todo.completed).length} tasks left</p>
                <p>{state.todos.filter(todo => todo.completed).length} completed</p>
            </div>
        </div>
    );
}

export default Counter; 