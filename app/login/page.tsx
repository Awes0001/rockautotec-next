"use client";

import { useState } from "react";
import { useAuth } from "@/components/auth-context";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Wrench, Mail, Lock, AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const { signIn, signUp } = useAuth();
  const router = useRouter();
  const [isLogin, setIsLogin]   = useState(true);
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw]     = useState(false);
  const [error, setError]       = useState("");
  const [success, setSuccess]   = useState("");
  const [loading, setLoading]   = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setSuccess(""); setLoading(true);
    try {
      if (isLogin) {
        await signIn(email, password);
        router.push("/");
      } else {
        await signUp(email, password);
        setSuccess("Account created! Check your email to verify before signing in.");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <Wrench className="h-6 w-6 text-red-500" />
            <span className="text-xl font-extrabold text-white tracking-tight">RockAutoTec</span>
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-white">
            {isLogin ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-1.5 text-sm text-zinc-400">
            {isLogin ? "Sign in to access your orders and saved parts." : "Join RockAutoTec and start saving on parts today."}
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
          {/* Toggle */}
          <div className="flex rounded-lg border border-zinc-800 bg-zinc-950 p-1 mb-6">
            {(["Sign In", "Create Account"] as const).map((label, i) => (
              <button
                key={label}
                onClick={() => { setIsLogin(i === 0); setError(""); setSuccess(""); }}
                className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${
                  (i === 0) === isLogin
                    ? "bg-red-600 text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {error && (
            <div className="flex items-start gap-2 rounded-lg border border-red-800 bg-red-900/20 px-4 py-3 mb-5 text-sm text-red-400">
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" /> {error}
            </div>
          )}
          {success && (
            <div className="flex items-start gap-2 rounded-lg border border-emerald-800 bg-emerald-900/20 px-4 py-3 mb-5 text-sm text-emerald-400">
              <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" /> {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Password</label>
                {isLogin && (
                  <button type="button" className="text-xs text-red-400 hover:text-red-300 transition-colors">
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
                <input
                  type={showPw ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 pl-10 pr-10 py-3 text-sm focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                />
                <button type="button" onClick={() => setShowPw((s) => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {!isLogin && (
                <p className="text-xs text-zinc-500 mt-1.5">Must be at least 8 characters.</p>
              )}
            </div>

            <button
              type="submit" disabled={loading}
              className="w-full mt-2 rounded-lg bg-red-600 hover:bg-red-500 active:bg-red-700 disabled:opacity-50 text-white font-semibold py-3 text-sm transition-colors"
            >
              {loading ? "Please wait…" : isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          {!isLogin && (
            <p className="text-xs text-zinc-500 text-center mt-4">
              By creating an account you agree to our{" "}
              <Link href="/terms" className="text-red-400 hover:text-red-300 underline underline-offset-2">Terms of Service</Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-red-400 hover:text-red-300 underline underline-offset-2">Privacy Policy</Link>.
            </p>
          )}
        </div>

        <p className="text-center text-xs text-zinc-500 mt-6">
          Need help?{" "}
          <Link href="/contact" className="text-red-400 hover:text-red-300 transition-colors">Contact Support</Link>
        </p>
      </div>
    </div>
  );
}
