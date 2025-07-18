import { useState } from 'react';
import { useTodos } from './TodoContext';
import './Todo.css';

function Counter() {
  const [text, setText] = useState('');
  const { state, dispatch } = useTodos();

  const addTodo = () => {
    if (text.trim() !== '') {
      dispatch({ type: 'todoAdded', payload: text });
      setText('');
    }
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
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
        {state.todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() =>
                dispatch({ type: 'todoToggled', payload: todo.id })
              }
            />
            {todo.text}
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
    </div>
  );
}

export default Counter;
