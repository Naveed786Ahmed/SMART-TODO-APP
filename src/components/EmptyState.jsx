import React from 'react'

const EmptyState = ({darkMode, filter, focusMode, visibleTodos}) => {
    return (
        <>
            {/* Focus Mode Empty State */}
            {focusMode && visibleTodos.length === 0 && (
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
            {!focusMode && visibleTodos.length === 0 && (
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
        </>
    )
}

export default EmptyState;