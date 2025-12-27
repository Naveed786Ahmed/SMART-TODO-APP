import React from 'react'
import { useTheme } from '../hooks/useTheme.js'
import Header from '../components/Header.jsx';
import { useTodos } from '../hooks/useTodos.js';
import AddTodoForm from '../components/AddTodoForm.jsx';

const Dashboard = () => {
    const { darkMode, toggleTheme } = useTheme();
    const {todos, addTodo} = useTodos();

    return (
        <>
            <div
                className='min-h-screen p-4 transition-all duration-300'
                style={{
                    background: darkMode
                        ? "linear-gradient(to bottom right, #1e293b, #0f172a)"
                        : "linear-gradient(to bottom right, #f8fafc, #c7d2fe)"
                }}

            >
                <div className='max-w-4xl mx-auto space-y-3'>
                    <Header todos={todos} darkMode={darkMode} toggleTheme={toggleTheme}/>
                    <AddTodoForm darkMode={darkMode} onAddTodo={addTodo}/>
                </div>
            </div>
        </>
    )
}

export default Dashboard