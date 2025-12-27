import React from 'react'
import { useProgress } from '../hooks/useProgress';

const Progressbar = ({todos, darkMode}) => {
    const { completedCount, progress } = useProgress(todos);

    return (
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
    )
}

export default Progressbar;