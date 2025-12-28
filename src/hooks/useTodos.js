import { useEffect, useState } from "react";

export const useTodos = () => {

    const [todos, setTodos] = useState([]);


    useEffect(() => {
        const savedTodos = localStorage.getItem("todos");
        if (savedTodos) {
            setTodos(JSON.parse(savedTodos));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const addTodo = (todo) => {
        setTodos(prev => [todo, ...prev]);
    }

    const toggleTodo = (id) => {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        );
    };

    const deleteTodo = (id) => {
        setTodos(prev => prev.filter(t => t.id !== id));
    };

    const restoreTodo = (todo) => {
        setTodos(prev => [todo, ...prev]);
    };

    const updateTodo = (updatedTodo) => {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo
            )
        );
    };


    return {
        todos, setTodos, addTodo, toggleTodo, deleteTodo, restoreTodo, updateTodo
    }
}
