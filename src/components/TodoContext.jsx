import { createContext, useReducer, useContext } from 'react';

const TodoContext = createContext();

const initialState = {
  todos: [],
  nextId: 1
};

function todoReducer(state, action) {
  switch (action.type) {
    case 'todoAdded':
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: state.nextId, text: action.payload, completed: false }
        ],
        nextId: state.nextId + 1
      };

    case 'todoToggled':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };

    case 'todoRemoved':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload)
      };

    default:
      return state;
  }
}

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  return useContext(TodoContext);
}
