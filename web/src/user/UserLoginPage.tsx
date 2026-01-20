import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import { auth, db } from "../firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const UserLoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [isSignup, setIsSignup] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        setError(null);
        try {
            if (!email || !password || (isSignup && !username)) {
                setError("Please fill in all fields");
                return;
            }

            if (isSignup) {
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email,
                    password
                );
                await setDoc(doc(db, "Users", userCredential.user.uid), {
                    email,
                    username,
                    role: "user",
                    bookmarks: [],
                });
            } else {
                await signInWithEmailAndPassword(auth, email, password);
            }
            navigate("/user-dashboard");
        } catch (err) {
            setError("Authentication failed. Please try again.");
            console.error(err);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            handleSubmit();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background Image with Dark Overlay */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage:
                        'url("https://images.unsplash.com/photo-1466781783364-36c955e42a7f?q=80&w=1920&auto=format&fit=crop")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
            <div className="absolute inset-0 z-0 bg-black/40" />

            {/* Glassmorphism Card */}
            <div
                className="relative z-10 w-full max-w-[520px] p-12 m-4 
        bg-[#d4d0c8]/95 backdrop-blur-sm 
        shadow-2xl 
        rounded-3xl"
            >
                <h2 className="text-center text-5xl font-serif text-[#4a5f3a] mb-12 tracking-wide">
                    {isSignup ? "Sign Up" : "Log In"}
                </h2>

                <div className="flex flex-col gap-6">
                    {isSignup && (
                        <GlassInput
                            icon={<User size={24} />}
                            placeholder="Username"
                            value={username}
                            onChange={setUsername}
                            onKeyPress={handleKeyPress}
                            type="text"
                        />
                    )}

                    <GlassInput
                        icon={<Mail size={24} />}
                        placeholder="Email"
                        value={email}
                        onChange={setEmail}
                        onKeyPress={handleKeyPress}
                        type="email"
                    />

                    <GlassInput
                        icon={<Lock size={24} />}
                        placeholder="Password"
                        value={password}
                        onChange={setPassword}
                        onKeyPress={handleKeyPress}
                        type="password"
                    />

                    {error && (
                        <p className="text-center text-sm text-red-600 bg-red-100 rounded-lg py-3 px-4">
                            {error}
                        </p>
                    )}

                    <button
                        onClick={handleSubmit}
                        className="w-full rounded-full py-5 mt-4 text-white text-xl font-semibold tracking-wide
              bg-[#4a6b3a] hover:bg-[#3d5a30] 
              shadow-lg transition-all duration-300 ease-in-out transform hover:scale-[1.02]
              active:scale-95"
                    >
                        {isSignup ? "Sign Up" : "Sign In"}
                    </button>
                </div>

                {/* Footer Links */}
                <div className="mt-8 text-center space-y-4">
                    {!isSignup && (
                        <button
                            type="button"
                            onClick={() => console.log("Forgot password clicked")}
                            className="text-[#4a5a4a] text-lg hover:underline font-medium"
                        >
                            Forgot Password?
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={() => {
                            setIsSignup(!isSignup);
                            setError(null);
                        }}
                        className="block w-full text-[#4a5a4a] text-lg font-medium hover:underline"
                    >
                        {isSignup
                            ? "Already a user? Log In"
                            : "New user? Create an account"}
                    </button>
                </div>

                {/* Social Buttons */}
                <div className="mt-10 flex justify-center gap-6">
                    {/* Google */}
                    <SocialButton
                        aria-label="Sign in with Google"
                        onClick={() => console.log("Google login")}
                    >
                        <svg className="w-8 h-8" viewBox="0 0 24 24">
                            <path
                                fill="#EA4335"
                                d="M5.266 9.765A7.077 7.077 0 0 1 12 4.909c1.69 0 3.218.6 4.418 1.582L19.91 3C17.782 1.145 15.055 0 12 0 7.27 0 3.198 2.698 1.24 6.65l4.026 3.115Z"
                            />
                            <path
                                fill="#34A853"
                                d="M16.04 18.013c-1.09.703-2.474 1.078-4.04 1.078a7.077 7.077 0 0 1-6.723-4.823l-4.04 3.067A11.965 11.965 0 0 0 12 24c2.933 0 5.735-1.043 7.834-3l-3.793-2.987Z"
                            />
                            <path
                                fill="#4A90E2"
                                d="M19.834 21c2.195-2.048 3.62-5.096 3.62-9 0-.71-.109-1.473-.272-2.182H12v4.637h6.436c-.317 1.559-1.17 2.766-2.395 3.558L19.834 21Z"
                            />
                            <path
                                fill="#FBBC05"
                                d="M5.277 14.268A7.12 7.12 0 0 1 4.909 12c0-.782.125-1.533.357-2.235L1.24 6.65A11.934 11.934 0 0 0 0 12c0 1.92.445 3.73 1.237 5.335l4.04-3.067Z"
                            />
                        </svg>
                    </SocialButton>

                    {/* Apple */}
                    <SocialButton
                        aria-label="Sign in with Apple"
                        onClick={() => console.log("Apple login")}
                    >
                        <svg
                            className="w-8 h-8 text-black"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.02 3.96-.83 2.18.28 3.39 1.18 3.39 1.18-2.65 1.43-2.18 5.61.59 7.03-.5 1.75-1.67 3.56-2.96 4.85h-.06zM12.03 7.25c-.15-2.23 1.67-4.06 3.74-4.25.29 2.58-2.54 4.5-3.74 4.25z" />
                        </svg>
                    </SocialButton>

                    {/* Facebook */}
                    <SocialButton
                        aria-label="Sign in with Facebook"
                        onClick={() => console.log("Facebook login")}
                    >
                        <svg
                            className="w-8 h-8 text-[#1877F2]"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                    </SocialButton>
                </div>
            </div>
        </div>
    );
};

export default UserLoginPage;

/* ---------------- Sub-Components ---------------- */

interface GlassInputProps {
    icon: React.ReactNode;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    onKeyPress: (e: React.KeyboardEvent) => void;
    type: string;
}

const GlassInput = ({
    icon,
    placeholder,
    value,
    onChange,
    onKeyPress,
    type,
}: GlassInputProps) => (
    <div className="relative">
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-[#555555] pointer-events-none z-10">
            {icon}
        </span>
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyPress={onKeyPress}
            placeholder={placeholder}
            className="w-full rounded-full bg-white border border-gray-300
        pl-14 pr-6 py-4 text-[#2d3748] placeholder:text-[#888888] text-lg
        focus:outline-none focus:bg-white focus:border-gray-400
        transition-all duration-200 shadow-sm"
            required
        />
    </div>
);

interface SocialButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const SocialButton = ({ children, onClick, ...props }: SocialButtonProps) => (
    <button
        type="button"
        onClick={onClick}
        className="w-20 h-20 flex items-center justify-center rounded-full bg-white 
    shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 ease-out
    active:scale-95"
        {...props}
    >
        {children}
    </button>
);