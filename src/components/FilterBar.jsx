import { Focus } from 'lucide-react'
import React from 'react'

const FilterBar = ({darkMode, filter, setFilter, focusMode, setFocusMode}) => {
    

    return (
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
    )
}

export default FilterBar;