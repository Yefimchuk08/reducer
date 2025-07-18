import { createContext, useReducer, useEffect, useContext } from "react";

export const TodoContext = createContext();

const initialState = {
  todos: []
};

const init = () => {
  const stored = localStorage.getItem("todos");
  return {
    todos: stored ? JSON.parse(stored) : []
  };
};

let nextId = 1;

function todoReducer(state, action) {
  switch (action.type) {
    case "todoAdded":
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: nextId++, text: action.payload, completed: false }
        ]
      };

    case "todoToggled":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload
            ? { ...todo, completed: !todo.completed }
            : todo
        )
      };

    case "todoRemoved":
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload)
      };

    case "todoEdited":
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo
        )
      };

    case "clearCompleted":
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed)
      };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}


export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState, init);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(state.todos));
  }, [state.todos]);

  const value = { state, dispatch };
  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => useContext(TodoContext);
