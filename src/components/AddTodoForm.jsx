import { Plus } from 'lucide-react';
import React, { useState } from 'react'

const AddTodoForm = ({ darkMode, onAddTodo }) => {

    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("medium");
    const [dueDate, setDueDate] = useState("");

    const handleAddTodo = () => {
        if (!title.trim()) return;

        onAddTodo({
            id: Date.now(),
            title: title.trim(),
            completed: false,
            priority,
            dueDate: dueDate || null,
            createdAt: Date.now()
        })

        setTitle("");
        setPriority("medium");
        setDueDate("");
    }

    return (
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
    )
}

export default AddTodoForm;