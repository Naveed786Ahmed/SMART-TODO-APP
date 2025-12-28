import { AlertCircle, Edit2, Trash2 } from 'lucide-react';
import React from 'react'

const TodoItems = ({darkMode, visibleTodos, isOverdue, toggleTodo, onEditTodo, handleDeleteTodo}) => {
    return (
        <>
            {visibleTodos.map(todo => (
                <div
                    key={todo.id}
                    className='rounded-xl shadow p-4 flex gap-4 items-start  transition-all duration-300 hover:shadow-lg'
                    style={{ backgroundColor: darkMode ? '#1f2937' : '#ffffff' }}
                >
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                        className='mt-2 cursor-pointer w-5 h-5'
                        style={{ accentColor: darkMode ? '#3b82f6' : '#2563eb' }}
                    />

                    <div className='flex-1'>
                        <p
                            className="font-medium"
                            style={{
                                textDecoration: todo.completed ? 'line-through' : 'none',
                                color: todo.completed
                                    ? (darkMode ? '#4b5563' : '#9ca3af')
                                    : (darkMode ? '#e5e7eb' : '#1f2937')
                            }}
                        >
                            {todo.title}
                        </p>

                        <div className='flex gap-2 mt-2 flex-wrap'>
                            <span
                                className="text-xs px-2 py-1 rounded border"
                                style={{
                                    backgroundColor: todo.priority === "high"
                                        ? (darkMode ? '#7f1d1d' : '#fee2e2')
                                        : todo.priority === "medium"
                                            ? (darkMode ? '#78350f' : '#fef3c7')
                                            : (darkMode ? '#14532d' : '#dcfce7'),
                                    color: todo.priority === "high"
                                        ? (darkMode ? '#fca5a5' : '#991b1b')
                                        : todo.priority === "medium"
                                            ? (darkMode ? '#fcd34d' : '#92400e')
                                            : (darkMode ? '#86efac' : '#166534'),
                                    borderColor: todo.priority === "high"
                                        ? (darkMode ? '#991b1b' : '#fecaca')
                                        : todo.priority === "medium"
                                            ? (darkMode ? '#b45309' : '#fde68a')
                                            : (darkMode ? '#166534' : '#bbf7d0')
                                }}
                            >
                                {todo.priority.toUpperCase()}
                            </span>

                            {todo.dueDate && (
                                <span className='text-xs px-2 py-1 rounded border flex items-center gap-1'
                                    style={{
                                        backgroundColor: isOverdue(todo.dueDate)
                                            ? (darkMode ? '#7f1d1d' : '#fee2e2')
                                            : (darkMode ? '#1e3a8a' : '#dbeafe'),
                                        color: isOverdue(todo.dueDate)
                                            ? (darkMode ? '#fca5a5' : '#991b1b')
                                            : (darkMode ? '#93c5fd' : '#1e40af'),
                                        borderColor: isOverdue(todo.dueDate)
                                            ? (darkMode ? '#991b1b' : '#fecaca')
                                            : (darkMode ? '#1e40af' : '#bfdbfe')
                                    }}
                                >
                                    <AlertCircle size={12} />
                                    {todo.dueDate}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className='flex gap-1'>
                        <button
                            onClick={() => onEditTodo(todo)}
                            className='p-2 rounded cursor-pointer transition-all duration-300'
                            style={{
                                backgroundColor: 'transparent',
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = darkMode ? '#1e3a8a' : '#dbeafe'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <Edit2 size={16} style={{ color: darkMode ? '#60a5fa' : '#2563eb' }} />
                        </button>
                        <button
                            onClick={() => handleDeleteTodo(todo)}
                            className='p-2 rounded cursor-pointer transition-all duration-300'
                            style={{
                                backgroundColor: 'transparent'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = darkMode ? '#7f1d1d' : '#fee2e2'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <Trash2 size={16} className='text-red-600' />
                        </button>
                    </div>
                </div>
            ))}
        </>
    )
}

export default TodoItems;