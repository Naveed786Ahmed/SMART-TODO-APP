import { AlertCircle, Edit2, Focus, Plus, Trash2, Moon, Sun, LogOut } from 'lucide-react';
import React, { useState, useEffect } from 'react'
import {useNavigate } from 'react-router-dom';
import { auth, signOut } from '../firebase/config.js';

const Dashboard = () => {

    // const [todos, setTodos] = useState([]);
    // const [title, setTitle] = useState("");
    // const [priority, setPriority] = useState("medium");
    // const [dueDate, setDueDate] = useState("");
    // const [filter, setFilter] = useState("all");
    // const [focusMode, setFocusMode] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingTodo, setEditingTodo] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editPriority, setEditPriority] = useState("medium");
    const [editDueDate, setEditDueDate] = useState("");
    const [undoTodo, setUndoTodo] = useState(null);
    const [showUndoToast, setShowUndoToast] = useState(false);
    const [undoProgress, setUndoProgress] = useState(100);
    // const [darkMode, setDarkMode] = useState(false);

    // const completedCount = todos.filter(t => t.completed).length;
    // const progress = todos.length === 0 ? 0 : Math.round((completedCount / todos.length) * 100)

    let navigate = useNavigate()

    // // Load dark mode preference on mount
    // useEffect(() => {
    //     const savedTheme = localStorage.getItem("theme");
    //     if (savedTheme === "dark") {
    //         setDarkMode(true);
    //     }
    // }, []);

    // // Save theme preference
    // useEffect(() => {
    //     localStorage.setItem("theme", darkMode ? "dark" : "light");
    // }, [darkMode]);

    // Load todos
    // useEffect(() => {
    //     const savedTodos = localStorage.getItem("todos");
    //     if (savedTodos) {
    //         setTodos(JSON.parse(savedTodos));
    //     }
    // }, []);

    // // Save todos
    // useEffect(() => {
    //     localStorage.setItem("todos", JSON.stringify(todos));
    // }, [todos]);

    // const handleAddTodo = () => {
    //     if (!title.trim()) return;

    //     const newTodo = {
    //         id: Date.now(),
    //         title: title.trim(),
    //         completed: false,
    //         priority,
    //         dueDate: dueDate || null,
    //         createdAt: Date.now()
    //     }

    //     setTodos(prev => [newTodo, ...prev]);

    //     setTitle("");
    //     setPriority("medium");
    //     setDueDate("");
    // }

    const toggleTodo = (id) => {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        );
    };

    // const isOverdue = (dueDate) => {
    //     if (!dueDate) return false;

    //     const today = new Date().setHours(0, 0, 0, 0);
    //     return new Date(dueDate) < today;
    // };

    // const smartSortedTodos = (list) => {
    //     return [...list].sort((a, b) => {

    //         // Overdue first
    //         const aOver = isOverdue(a.dueDate);
    //         const bOver = isOverdue(b.dueDate);

    //         if (aOver && !bOver) return -1;
    //         if (!aOver && bOver) return 1;

    //         // Priority order
    //         const priorityRank = { high: 0, medium: 1, low: 2 };
    //         if (priorityRank[a.priority] !== priorityRank[b.priority]) {
    //             return priorityRank[a.priority] - priorityRank[b.priority];
    //         }

    //         // Newest first
    //         return b.createdAt - a.createdAt;
    //     });
    // };

    // const visibleTodos = () => {
    //     let list = todos;

    //     if (filter === "active") {
    //         list = list.filter(t => !t.completed);
    //     }

    //     if (filter === "completed") {
    //         list = list.filter(t => t.completed);
    //     }

    //     if (focusMode) {
    //         list = list.filter(
    //             t => !t.completed && t.priority === "high"
    //         );
    //     }

    //     return smartSortedTodos(list);
    // };


    const deleteTodo = (todo) => {
        setTodos(prev => prev.filter(t => t.id !== todo.id));

        setUndoTodo(todo);
        setShowUndoToast(true);
        setUndoProgress(100);

        let start = 100;
        const interval = setInterval(() => {
            start -= 2;
            setUndoProgress(start);

            if (start <= 0) {
                clearInterval(interval);
                setShowUndoToast(false);
                setUndoTodo(null);
            }
        }, 100); // 5 seconds total
    };


    const handleUndo = () => {
        if (!undoTodo) return;

        setTodos(prev => [undoTodo, ...prev]);
        setUndoTodo(null);
        setShowUndoToast(false);
        setUndoProgress(0);
    };

    const handleUpdateTodo = () => {
        if (!editTitle.trim()) return;

        setTodos(prev =>
            prev.map(todo =>
                todo.id === editingTodo.id
                    ? {
                        ...todo,
                        title: editTitle.trim(),
                        priority: editPriority,
                        dueDate: editDueDate || null
                    }
                    : todo
            )
        );

        setShowEditModal(false);
        setEditingTodo(null);
    };

    // const handleLogOut = () => {
    //     signOut(auth).then(() => {
    //         console.log("Sign-out successful.");
            
    //         setTimeout(() => {
    //             navigate("/")
    //         }, 500);
    //     }).catch((error) => {
    //         console.log(error);
            
    //     });
    // }

    return (
        <div
            className='min-h-screen p-4 transition-all duration-300'
            style={{
                background: darkMode
                    ? 'linear-gradient(to bottom right, #1e293b, #0f172a)'
                    : 'linear-gradient(to bottom right, #f8fafc, #c7d2fe)'
            }}
        >
            <div className='max-w-4xl mx-auto space-y-3'>

                {/* Header */}
                <div
                    className='rounded-2xl shadow-xl p-6 transition-all duration-300'
                    style={{
                        background: darkMode ? '#1f2937' : '#ffffff'
                    }}
                >
                    <div className='flex flex-col sm:flex-row items-center justify-between gap-3 mb-2'>
                        {/* Title & Tagline - Left Side */}
                        <div className='text-center sm:text-left'>
                            <h1
                                className='text-2xl sm:text-3xl font-bold'
                                style={{ color: darkMode ? '#60a5fa' : '#2563eb' }}
                            >
                                SMART TODO APP
                            </h1>
                            <p
                                className='mt-1 text-xs sm:text-sm font-bold'
                                style={{ color: darkMode ? '#6b7280' : '#9ca3af' }}
                            >
                                Manage Tasks Smartly
                            </p>
                        </div>

                        {/* Right Side - Dark Mode + Logout */}
                        <div className='flex items-center gap-2'>
                            {/* Dark Mode Toggle */}
                            <button
                                onClick={() => setDarkMode(!darkMode)}
                                className='p-2 rounded-lg hover:opacity-80 transition-all duration-300 cursor-pointer'
                                style={{
                                    backgroundColor: darkMode ? '#374151' : '#f3f4f6'
                                }}
                                aria-label="Toggle dark mode"
                            >
                                {darkMode ? (
                                    <Sun className='text-yellow-400' size={20} />
                                ) : (
                                    <Moon className='text-gray-600' size={20} />
                                )}
                            </button>

                            {/* Logout Button */}
                            <button
                                onClick={handleLogOut}
                                className='px-4 py-2 rounded-lg font-semibold transition-all duration-300 cursor-pointer flex items-center gap-2 shadow-md hover:shadow-lg'
                                style={{
                                    background: darkMode
                                        ? 'linear-gradient(to right, #dc2626, #b91c1c)'
                                        : 'linear-gradient(to right, #ef4444, #dc2626)',
                                    color: '#ffffff'
                                }}
                            >
                                <LogOut size={18} />
                                <span className='hidden sm:inline'>Logout</span>
                            </button>
                        </div>
                    </div>


                    {/* Progress */}
                    <div className='mt-6'>
                        <div className='flex justify-between text-sm mb-1' style={{ color: darkMode ? '#9ca3af' : '#4b5563' }}>
                            <span>
                                Completed {completedCount} / {todos.length}
                            </span>
                            <span>{progress}%</span>
                        </div>

                        <div className='w-full h-3 rounded-full' style={{ backgroundColor: darkMode ? '#374151' : '#e5e7eb' }}>
                            <div
                                className='h-3 rounded-full transition-all duration-300'
                                style={{
                                    width: `${progress}%`,
                                    background: darkMode
                                        ? 'linear-gradient(to right, #60a5fa, #818cf8)'
                                        : 'linear-gradient(to right, #3b82f6, #4f46e5)'
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* ADD TODO */}
                <div className='rounded-2xl shadow p-6 space-y-4 transition-all duration-300' style={{ backgroundColor: darkMode ? '#1f2937' : '#ffffff' }}>
                    <h2 className='text-center text-lg font-semibold' style={{ color: darkMode ? '#60a5fa' : '#2563eb' }}>
                        Add New Task
                    </h2>

                    <input
                        placeholder='What needs to be done?'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='w-full p-3 border-2 rounded-lg focus: outline-none transition-all duration-300'
                        style={{
                            backgroundColor: darkMode ? '#374151' : '#ffffff',
                            borderColor: darkMode ? '#4b5563' : '#e5e7eb',
                            color: darkMode ? '#f3f4f6' : '#1f2937'
                        }}
                    />

                    <div className='flex flex-col sm:flex-row gap-3'>
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className='p-3 border-2 rounded-lg focus:outline-none  transition-all duration-300'
                            style={{
                                backgroundColor: darkMode ? '#374151' : '#ffffff',
                                borderColor: darkMode ? '#4b5563' : '#e5e7eb',
                                color: darkMode ? '#f3f4f6' : '#1f2937'
                            }}
                        >
                            <option value="low">Low Priority</option>
                            <option value="medium">Medium Priority</option>
                            <option value="high">High Priority</option>
                        </select>

                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className='p-3 border-2 rounded-lg flex-1 focus:outline-none transition-all duration-300'
                            style={{
                                backgroundColor: darkMode ? '#374151' : '#ffffff',
                                borderColor: darkMode ? '#4b5563' : '#e5e7eb',
                                color: darkMode ? '#f3f4f6' : '#1f2937'
                            }}
                        />

                        <button
                            onClick={handleAddTodo}
                            className='flex items-center justify-center gap-2 px-6 py-3 text-white rounded-lg hover:opacity-90 transition-all duration-300 cursor-pointer shadow-md hover:shadow-lg'
                            style={{
                                background: darkMode
                                    ? 'linear-gradient(to right, #3b82f6, #6366f1)'
                                    : 'linear-gradient(to right, #2563eb, #4f46e5)'
                            }}
                        >
                            <Plus size={18} /> Add
                        </button>
                    </div>
                </div>

                <div className='flex items-center gap-3 flex-wrap sm:flex-nowrap'>
                    {/* Filter */}
                    <div className='flex gap-2'>
                        {
                            ["all", "active", "completed"].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className="px-5 py-2 rounded-xl font-medium transition-all duration-300 cursor-pointer shadow-md"
                                    style={{
                                        backgroundColor: filter === f
                                            ? (darkMode ? '#3b82f6' : '#2563eb')
                                            : (darkMode ? '#1f2937' : '#ffffff'),
                                        color: filter === f
                                            ? '#ffffff'
                                            : (darkMode ? '#d1d5db' : '#374151')
                                    }}
                                >
                                    {f.charAt(0).toUpperCase() + f.slice(1)}
                                </button>
                            ))
                        }
                    </div>

                    {/* Focus Mode */}
                    <button
                        onClick={() => setFocusMode(!focusMode)}
                        className="ml-auto px-5 py-2 rounded-xl font-semibold flex items-center gap-2 transition-all duration-300 shadow-md cursor-pointer"
                        style={{
                            background: focusMode
                                ? 'linear-gradient(to right, #9333ea, #4f46e5)'
                                : (darkMode ? '#1f2937' : '#ffffff'),
                            color: focusMode ? '#ffffff' : (darkMode ? '#d1d5db' : '#374151')
                        }}
                    >
                        <Focus size={16} /> {focusMode ? "Focus ON" : "Focus Mode"}
                    </button>
                </div>

                {/* TODO List */}
                <div className='space-y-3'>

                    {/* Focus Mode Empty State */}
                    {focusMode && visibleTodos().length === 0 && (
                        <div
                            className="border p-6 rounded-xl text-center shadow mb-4 transition-all duration-300"
                            style={{
                                backgroundColor: darkMode ? '#581c87' : '#faf5ff',
                                borderColor: darkMode ? '#7c3aed' : '#e9d5ff',
                                color: darkMode ? '#e9d5ff' : '#7c3aed'
                            }}
                        >
                            <b>Focus Mode</b> is on
                            <br />
                            No high priority tasks right now.
                        </div>
                    )}

                    {/* Default Empty State*/}
                    {!focusMode && visibleTodos().length === 0 && (
                        <div
                            className='rounded-xl shadow p-10 text-center transition-all duration-300'
                            style={{
                                backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                                color: darkMode ? '#6b7280' : '#9ca3af'
                            }}
                        >
                            {filter === "completed"
                                ? "📝 No completed tasks yet"
                                : filter === "active"
                                    ? "📝 No active tasks"
                                    : "📝 No tasks yet. Add your first todo!"}
                        </div>
                    )}


                    {/* Cards*/}
                    {visibleTodos().map(todo => (
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
                                    onClick={() => {
                                        setEditingTodo(todo);
                                        setEditTitle(todo.title);
                                        setEditPriority(todo.priority);
                                        setEditDueDate(todo.dueDate || "");
                                        setShowEditModal(true);
                                    }}
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
                                    onClick={() => deleteTodo(todo)}
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

                    {/* Undo Toast */}
                    {showUndoToast && (
                        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-[320px]">
                            <div
                                className="text-white rounded-xl shadow-xl overflow-hidden"
                                style={{ backgroundColor: darkMode ? '#374151' : '#111827' }}
                            >

                                <div className="flex items-center justify-between px-5 py-4">
                                    <span className="text-sm">
                                        Todo deleted
                                    </span>

                                    <button
                                        onClick={handleUndo}
                                        className="px-4 py-1 rounded-lg cursor-pointer font-semibold transition-all duration-300"
                                        style={{
                                            backgroundColor: darkMode ? '#4b5563' : '#ffffff',
                                            color: darkMode ? '#ffffff' : '#111827'
                                        }}
                                    >
                                        Undo
                                    </button>
                                </div>

                                {/* Timer bar */}
                                <div
                                    className="h-1"
                                    style={{ backgroundColor: darkMode ? '#4b5563' : '#374151' }}
                                >
                                    <div
                                        className="h-1 transition-all duration-100"
                                        style={{
                                            width: `${undoProgress}%`,
                                            backgroundColor: darkMode ? '#60a5fa' : '#3b82f6'
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Edit Modal */}
                    {
                        showEditModal && (
                            <div
                                className='fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300'
                                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                            >
                                {/* Modal Card */}
                                <div
                                    className='w-full max-w-md rounded-2xl shadow-xl p-6 transition-all duration-300'
                                    style={{ backgroundColor: darkMode ? '#1f2937' : '#ffffff' }}
                                >
                                    <h2 className='text-xl font-bold text-center' style={{ color: darkMode ? '#60a5fa' : '#2563eb' }}>
                                        Edit Task
                                    </h2>

                                    <p className="text-sm text-center mb-6" style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}>
                                        Update your task details
                                    </p>

                                    {/* Title */}
                                    <div className='space-y-1 mb-4'>
                                        <label className="text-sm font-medium" style={{ color: darkMode ? '#d1d5db' : '#4b5563' }}>
                                            Task Title
                                        </label>
                                        <input
                                            value={editTitle}
                                            onChange={(e) => setEditTitle(e.target.value)}
                                            placeholder='Edit task title'
                                            className='w-full p-3 border-2 rounded-lg focus: outline-none transition-all duration-300'
                                            style={{
                                                backgroundColor: darkMode ? '#374151' : '#ffffff',
                                                borderColor: darkMode ? '#4b5563' : '#e5e7eb',
                                                color: darkMode ? '#f3f4f6' : '#1f2937'
                                            }}
                                        />
                                    </div>

                                    {/* Priority & Date */}
                                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6'>
                                        <div>
                                            <label className='text-sm font-medium' style={{ color: darkMode ? '#d1d5db' : '#4b5563' }}>
                                                Priority
                                            </label>
                                            <select
                                                value={editPriority}
                                                onChange={(e) => setEditPriority(e.target.value)}
                                                className='w-full p-3 border-2 rounded-lg focus:outline-none transition-all duration-300'
                                                style={{
                                                    backgroundColor: darkMode ? '#374151' : '#ffffff',
                                                    borderColor: darkMode ? '#4b5563' : '#e5e7eb',
                                                    color: darkMode ? '#f3f4f6' : '#1f2937'
                                                }}
                                            >
                                                <option value="low">Low</option>
                                                <option value="medium">Medium</option>
                                                <option value="high">High</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium" style={{ color: darkMode ? '#d1d5db' : '#4b5563' }}>
                                                Due Date
                                            </label>
                                            <input
                                                type="date"
                                                value={editDueDate}
                                                onChange={(e) => setEditDueDate(e.target.value)}
                                                className="w-full p-3 border-2 rounded-lg outline-none  transition-all duration-300"
                                                style={{
                                                    backgroundColor: darkMode ? '#374151' : '#ffffff',
                                                    borderColor: darkMode ? '#4b5563' : '#e5e7eb',
                                                    color: darkMode ? '#f3f4f6' : '#1f2937'
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className='flex gap-3'>
                                        <button
                                            onClick={() => setShowEditModal(false)}
                                            className="flex-1 py-3 rounded-xl cursor-pointer font-semibold transition-all duration-300"
                                            style={{
                                                backgroundColor: darkMode ? '#374151' : '#f3f4f6',
                                                color: darkMode ? '#d1d5db' : '#1f2937'
                                            }}
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            onClick={handleUpdateTodo}
                                            className="flex-1 py-3 rounded-xl font-semibold cursor-pointer text-white transition-all duration-300 shadow-md"
                                            style={{
                                                background: darkMode
                                                    ? 'linear-gradient(to right, #3b82f6, #6366f1)'
                                                    : 'linear-gradient(to right, #2563eb, #4f46e5)'
                                            }}
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                </div>
            </div>
        </div>
    );
};

export default Dashboard;