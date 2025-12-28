import React from 'react'

const EditModal = ({showEditModal, darkMode, editTitle, setEditTitle, editPriority, setEditPriority, editDueDate, setEditDueDate, handleUpdateTodo, setShowEditModal}) => {
    return (
        <>
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
        </>
    )
}

export default EditModal;