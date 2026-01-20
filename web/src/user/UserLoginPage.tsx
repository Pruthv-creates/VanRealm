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

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleSubmit();
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage:
                        'url("https://images.unsplash.com/photo-1466781783364-36c955e42a7f?q=80&w=1920&auto=format&fit=crop")',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />
            <div className="absolute inset-0 bg-black/45" />

            {/* Auth Card */}
            <div
  className="
    relative z-10 w-full max-w-lg mx-4
    px-12 py-14
    rounded-3xl
    bg-[#d6d2c7]/95 backdrop-blur-md
    border border-[#bdb8ac]
    shadow-[0_24px_60px_rgba(0,0,0,0.35)]
  "
>
  <h2 className="text-center text-4xl font-semibold text-[#3f5d35] mb-3">
    {isSignup ? "Create Account" : "Welcome Back"}
  </h2>

  <p className="text-center text-base text-[#5f6b5b] mb-10">
    {isSignup
      ? "Start your herbal journey with us"
      : "Sign in to continue your herbal journey"}
  </p>

                <div className="space-y-5">
                    {isSignup && (
                        <GlassInput
                            icon={<User size={20} />}
                            placeholder="Username"
                            value={username}
                            onChange={setUsername}
                            onKeyDown={handleKeyDown}
                            type="text"
                        />
                    )}

                    <GlassInput
                        icon={<Mail size={20} />}
                        placeholder="Email address"
                        value={email}
                        onChange={setEmail}
                        onKeyDown={handleKeyDown}
                        type="email"
                    />

                    <GlassInput
                        icon={<Lock size={20} />}
                        placeholder="Password"
                        value={password}
                        onChange={setPassword}
                        onKeyDown={handleKeyDown}
                        type="password"
                    />

                    {error && (
                        <p className="text-sm text-red-700 bg-red-100 rounded-lg px-4 py-3 text-center">
                            {error}
                        </p>
                    )}

                    <button
                        onClick={handleSubmit}
                        className="w-full mt-2 py-4 rounded-full
                        bg-[#4a6b3a] hover:bg-[#3d5a30]
                        text-white font-semibold text-base
                        shadow-lg hover:shadow-xl
                        transition-all duration-300
                        active:scale-95"
                    >
                        {isSignup ? "Sign Up" : "Sign In"}
                    </button>
                </div>

                {/* Footer Links */}
                <div className="mt-6 text-center space-y-3">
                    {!isSignup && (
                        <button
                            type="button"
                            className="text-sm text-[#5f6b5b] hover:text-[#4a6b3a] transition"
                        >
                            Forgot password?
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={() => {
                            setIsSignup(!isSignup);
                            setError(null);
                        }}
                        className="block w-full text-sm text-[#4a6b3a] font-medium hover:underline"
                    >
                        {isSignup
                            ? "Already have an account? Log in"
                            : "New here? Create an account"}
                    </button>
                </div>

                {/* Divider */}
                <div className="mt-8 flex items-center gap-4">
                    <div className="flex-1 h-px bg-[#bdb8ac]" />
                    <span className="text-xs text-[#6b6b6b]">
                        or continue with
                    </span>
                    <div className="flex-1 h-px bg-[#bdb8ac]" />
                </div>

                {/* Social Auth */}
                <div className="mt-6 flex justify-center gap-4">
                    <SocialButton aria-label="Google login">
                        <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-6 h-6" />
                    </SocialButton>

                    <SocialButton aria-label="Apple login">
                        <img src="https://www.svgrepo.com/show/303128/apple-logo.svg" className="w-6 h-6" />
                    </SocialButton>

                    <SocialButton aria-label="Facebook login">
                        <img src="https://www.svgrepo.com/show/475647/facebook-color.svg" className="w-6 h-6" />
                    </SocialButton>
                </div>
            </div>
        </div>
    );
};

export default UserLoginPage;

/* ---------- Sub Components ---------- */

interface GlassInputProps {
    icon: React.ReactNode;
    placeholder: string;
    value: string;
    onChange: (value: string) => void;
    onKeyDown: (e: React.KeyboardEvent) => void;
    type: string;
}

const GlassInput = ({
    icon,
    placeholder,
    value,
    onChange,
    onKeyDown,
    type,
}: GlassInputProps) => (
    <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5f6b5b]">
            {icon}
        </span>
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            className="
w-full rounded-full
bg-white
border border-[#bdb8ac]
pl-16 pr-7 py-5
text-lg text-[#2d3748]
placeholder:text-[#8b8b8b]
focus:outline-none
focus:border-[#4a6b3a]
focus:ring-2 focus:ring-[#4a6b3a]/30
transition-all duration-200
"

            required
        />
    </div>
);

interface SocialButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

const SocialButton = ({ children, ...props }: SocialButtonProps) => (
    <button
        type="button"
        className="w-14 h-14 rounded-full bg-white
        border border-gray-200
        shadow-md hover:shadow-lg
        flex items-center justify-center
        transition-all duration-300
        hover:-translate-y-[1px]
        active:scale-95"
        {...props}
    >
        {children}
    </button>
);
