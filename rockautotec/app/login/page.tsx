"use client";

import { useState } from "react";
import { useAuth } from "@/components/auth-context";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { signIn, signUp } = useAuth();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  async function handleSubmit() {
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      if (isLogin) {
        await signIn(email, password);
        router.push("/");
      } else {
        await signUp(email, password);
        setSuccess("Account created! Please check your email to verify.");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-white mb-2">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="text-gray-400 mb-6">
          {isLogin ? "Sign in to your account" : "Sign up for RockAutoTec"}
        </p>
        {error && (
          <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded-xl mb-4 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-900 border border-green-700 text-green-300 px-4 py-3 rounded-xl mb-4 text-sm">
            {success}
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-400 text-sm mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 placeholder-gray-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-400 text-sm mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-gray-800 text-white border border-gray-700 rounded-xl px-4 py-3 focus:outline-none focus:border-red-500 placeholder-gray-500"
          />
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-50"
        >
          {loading ? "Please wait..." : isLogin ? "Sign In" : "Sign Up"}
        </button>
        <p className="text-center text-gray-400 text-sm mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
              setSuccess("");
            }}
            className="text-red-400 hover:text-red-300 ml-1"
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </div>
    </main>
  );
}