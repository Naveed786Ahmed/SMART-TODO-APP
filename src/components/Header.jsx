import React from 'react'
import { LogOut, Moon, Sun } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.js';
import Progressbar from './Progressbar.jsx';

const Header = ({ todos, darkMode, toggleTheme }) => {
    const { handleLogOut } = useAuth();

    return (
        <>
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
                            onClick={toggleTheme}
                            className='p-2 rounded-lg hover:opacity-80 transition-all duration-300 cursor-pointer'
                            style={{
                                backgroundColor: darkMode ? '#374151' : '#f3f4f6'
                            }}
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
                <Progressbar todos={todos} darkMode={darkMode}/>
            </div>
        </>
    )
}

export default Header;