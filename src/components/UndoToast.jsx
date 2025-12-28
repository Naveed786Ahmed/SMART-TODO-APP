import React from 'react'

const UndoToast = ({darkMode, showUndoToast, undoProgress, handleUndo}) => {
    return (
        <>
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
        </>
    )
}

export default UndoToast;