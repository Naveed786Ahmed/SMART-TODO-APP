import React, { useState, useEffect } from 'react'
import { AlertCircle, CheckCircle, CheckCircle2, Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
import { auth, signInWithEmailAndPassword } from '../firebase/config.js';

const Login = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [darkMode, setDarkMode] = useState(false);
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    // Load theme from localStorage on mount
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "dark") {
            setDarkMode(true);
        }
    }, []);

    const handleLogin = () => {
        setError("");
        setSuccess("");

        if (!email || !password) {
            setError("Please fill all fields");
            return;
        }

        console.log("LOGIN DATA:", { email, password });
        setLoading(true);

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log("Login user:", user);
                setSuccess("🎉 Login Successfully!");

                setTimeout(() => {
                    navigate("/dashboard");
                }, 1200);
            })
            .catch((error) => {
                switch (error.code) {
                    case "auth/user-not-found":
                        setError("No account found with this email");
                        break;

                    case "auth/wrong-password":
                        setError("Incorrect password");
                        break;

                    case "auth/invalid-email":
                        setError("Invalid email address");
                        break;

                    case "auth/too-many-requests":
                        setError("Too many attempts. Try again later");
                        break;

                    case "auth/network-request-failed":
                        setError("Network error. Check your internet");
                        break;

                    default:
                        setError("Something went wrong. Please try again");
                }
            }).finally(() => {
                setLoading(false);
            });
    }

    return (
        <div
            className='min-h-screen flex items-center justify-center p-4 transition-all duration-300'
            style={{
                background: darkMode
                    ? 'linear-gradient(to bottom right, #1e293b, #0f172a)'
                    : 'linear-gradient(to bottom right, #eff6ff, #e0e7ff, #f3e8ff)'
            }}
        >
            <div className='w-full max-w-md'>

                {/* Card */}
                <div
                    className='rounded-2xl shadow-xl p-8 transition-all duration-300'
                    style={{ backgroundColor: darkMode ? '#1f2937' : '#ffffff' }}
                >

                    {/* Branding */}
                    <div className='text-center mb-8'>
                        <div
                            className='inline-block p-3 rounded-2xl mb-3'
                            style={{
                                background: darkMode
                                    ? 'linear-gradient(to bottom right, #3b82f6, #6366f1)'
                                    : 'linear-gradient(to bottom right, #2563eb, #4f46e5)'
                            }}
                        >
                            <CheckCircle size={32} className='text-white' />
                        </div>
                        <h1
                            className='text-3xl font-bold'
                            style={{ color: darkMode ? '#e5e7eb' : '#1f2937' }}
                        >
                            SMART TODO
                        </h1>
                        <p
                            className='mt-1'
                            style={{ color: darkMode ? '#9ca3af' : '#6b7280' }}
                        >
                            Login to Your Account
                        </p>
                    </div>

                    {/* Email */}
                    <div className='mb-4 relative'>
                        <Mail
                            className='absolute left-3 top-1/2 -translate-y-1/2'
                            style={{ color: darkMode ? '#6b7280' : '#9ca3af' }}
                        />
                        <input
                            type="email"
                            placeholder='Enter your email'
                            className='w-full pl-11 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-300'
                            style={{
                                backgroundColor: darkMode ? '#374151' : '#ffffff',
                                borderColor: darkMode ? '#4b5563' : '#e5e7eb',
                                color: darkMode ? '#f3f4f6' : '#1f2937'
                            }}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Password */}
                    <div className='mb-4 relative'>
                        <Lock
                            className='absolute left-3 top-1/2 -translate-y-1/2'
                            style={{ color: darkMode ? '#6b7280' : '#9ca3af' }}
                        />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder='Password (min 6 chars)'
                            className='w-full pl-11 pr-4 py-3 border-2 rounded-lg focus:outline-none transition-all duration-300'
                            style={{
                                backgroundColor: darkMode ? '#374151' : '#ffffff',
                                borderColor: darkMode ? '#4b5563' : '#e5e7eb',
                                color: darkMode ? '#f3f4f6' : '#1f2937'
                            }}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            onClick={() => setShowPassword(!showPassword)}
                            className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer'
                            style={{ color: darkMode ? '#6b7280' : '#9ca3af' }}
                        >
                            {showPassword ? <EyeOff /> : <Eye />}
                        </button>
                    </div>

                    {/* Error */}
                    {error && (
                        <div
                            className='flex items-center gap-1 text-sm mb-3 p-2 rounded'
                            style={{
                                backgroundColor: darkMode ? '#7f1d1d' : '#fee2e2',
                                color: darkMode ? '#fca5a5' : '#991b1b'
                            }}
                        >
                            <AlertCircle size={16} />
                            {error}
                        </div>
                    )}

                    {success && (
                        <div
                            className='flex items-center gap-1 text-sm mb-3 p-2 rounded transition-all'
                            style={{
                                backgroundColor: darkMode ? '#14532d' : '#dcfce7',
                                color: darkMode ? '#86efac' : '#166534'
                            }}
                        >
                            <CheckCircle2 size={16} />
                            {success}
                        </div>
                    )}

                    {/* Button */}
                    <button
                        onClick={handleLogin}
                        disabled={loading}
                        className="w-full py-3 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2"
                        style={{
                            background: loading
                                ? '#9ca3af'
                                : darkMode
                                    ? 'linear-gradient(to right, #3b82f6, #6366f1)'
                                    : 'linear-gradient(to right, #2563eb, #4f46e5)',
                            cursor: loading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" size={18} />
                                Login...
                            </>
                        ) : (
                            "Login"
                        )}
                    </button>

                    {/* Switch */}
                    <p
                        className='text-center mt-6'
                        style={{ color: darkMode ? '#9ca3af' : '#4b5563' }}
                    >
                        Don't have an account?{" "}
                        <span
                            onClick={() => navigate("/register")}
                            className='font-semibold cursor-pointer hover:underline'
                            style={{ color: darkMode ? '#60a5fa' : '#2563eb' }}
                        >
                            Register
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login