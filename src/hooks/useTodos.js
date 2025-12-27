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

    return {
        todos, setTodos, addTodo
    }
}
