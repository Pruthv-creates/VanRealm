import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { Mail, Lock, User, Facebook } from "lucide-react";

import { auth, db } from "../firebase";

import {

    createUserWithEmailAndPassword,

    signInWithEmailAndPassword,

} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";



const UserLoginPage = () => {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [username, setUsername] = useState(""); // 👈 new state for username

    const [isSignup, setIsSignup] = useState(false);

    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();



    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        try {

            if (isSignup) {

                const userCredential = await createUserWithEmailAndPassword(

                    auth,

                    email,

                    password,

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

            setError("Authentication failed");

        }

    };



    return (

        <div

            className="min-h-screen flex items-center justify-center bg-cover bg-center relative"

            style={{

                backgroundImage: 'url("https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1920&auto=format&fit=crop")', // Nature/Plant background

            }}

        >

            {/* Overlay to ensure text readability if needed, though glass effect handles most */}

            <div className="absolute inset-0 bg-black/20" />



            <div className="w-full max-w-md bg-white/20 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl p-8 space-y-8 relative z-10 transition-all duration-300 hover:shadow-3xl hover:bg-white/25">

                <h2 className="text-4xl font-serif font-bold text-center text-[#1a4d2e] drop-shadow-sm">

                    {isSignup ? "Sign Up" : "Log In"}

                </h2>



                <form onSubmit={handleSubmit} className="space-y-6">

                    {isSignup && (

                        <div className="relative group">

                            <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#1a4d2e]/70 w-5 h-5 group-hover:text-[#1a4d2e] transition-colors" />

                            <input

                                id="userName"

                                type="text"

                                value={username}

                                onChange={(e) => setUsername(e.target.value)}

                                placeholder="Username"

                                className="w-full pl-12 pr-4 py-3.5 bg-white/50 border border-white/40 rounded-full text-[#1a4d2e] placeholder-[#1a4d2e]/50 focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]/50 focus:bg-white/70 transition-all shadow-inner"

                                required

                            />

                        </div>

                    )}



                    <div className="relative group">

                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#1a4d2e]/70 w-5 h-5 group-hover:text-[#1a4d2e] transition-colors" />

                        <input

                            id="userEmail"

                            type="email"

                            value={email}

                            onChange={(e) => setEmail(e.target.value)}

                            placeholder="Email"

                            className="w-full pl-12 pr-4 py-3.5 bg-white/50 border border-white/40 rounded-full text-[#1a4d2e] placeholder-[#1a4d2e]/50 focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]/50 focus:bg-white/70 transition-all shadow-inner"

                            required

                        />

                    </div>



                    <div className="relative group">

                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#1a4d2e]/70 w-5 h-5 group-hover:text-[#1a4d2e] transition-colors" />

                        <input

                            id="userPassword"

                            type="password"

                            value={password}

                            onChange={(e) => setPassword(e.target.value)}

                            placeholder="Password"

                            className="w-full pl-12 pr-4 py-3.5 bg-white/50 border border-white/40 rounded-full text-[#1a4d2e] placeholder-[#1a4d2e]/50 focus:outline-none focus:ring-2 focus:ring-[#1a4d2e]/50 focus:bg-white/70 transition-all shadow-inner"

                            required

                        />

                    </div>



                    {error && <p className="text-red-800 bg-red-100/50 py-1 px-3 rounded-full text-sm text-center font-medium backdrop-blur-sm">{error}</p>}



                    <button

                        type="submit"

                        className="w-full bg-[#1a4d2e] text-white py-3.5 rounded-full hover:bg-[#143d23] transition-all duration-300 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"

                    >

                        {isSignup ? "Create Account" : "Sign In"}

                    </button>



                    {!isSignup && (

                        <div className="text-center">

                            <a href="#" className="text-[#1a4d2e] text-sm hover:underline font-medium">Forgot Password?</a>

                        </div>

                    )}

                </form>



                <div className="flex flex-col items-center space-y-4">

                    <p className="text-[#1a4d2e] text-sm font-medium">

                        {isSignup ? "Or sign up with" : "Or sign in with"}

                    </p>

                    <div className="flex space-x-4">

                        <button className="p-3 bg-white/60 hover:bg-white/80 rounded-full shadow-md transition-all text-[#1a4d2e]">

                            {/* Google Icon SVG */}

                            <svg className="w-6 h-6" viewBox="0 0 24 24">

                                <path fill="currentColor" d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />

                            </svg>

                        </button>

                        <button className="p-3 bg-white/60 hover:bg-white/80 rounded-full shadow-md transition-all text-[#1a4d2e]">

                            <span className="w-6 h-6 flex items-center justify-center font-bold text-xl"></span>

                        </button>

                        <button className="p-3 bg-white/60 hover:bg-white/80 rounded-full shadow-md transition-all text-[#1a4d2e]">

                            <Facebook className="w-6 h-6" />

                        </button>

                    </div>

                    <button

                        type="button"

                        onClick={() => setIsSignup(!isSignup)}

                        className="text-[#1a4d2e] hover:text-[#0f2e1b] text-sm font-bold transition-colors hover:underline mt-2"

                    >

                        {isSignup ? "Already have an account? Log In" : "New user? Create an account"}

                    </button>

                </div>

            </div>

        </div>

    );

};



export default UserLoginPage;

