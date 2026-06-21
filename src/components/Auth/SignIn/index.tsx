"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Logo from "@/components/Layout/Header/Logo"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

const Signin = () => {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!email || !password) { setError("Email and password are required"); return }
    setLoading(true)
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (authError) {
      setError(authError.message)
    } else {
      router.push("/dashboard")
      router.refresh()
    }
  }

  return (
    <>
      <div className="mb-8 text-center mx-auto inline-block max-w-[160px]">
        <Logo />
      </div>
      <div className="mb-6 text-center">
        <h2 className="text-white text-2xl font-semibold">Welcome back</h2>
        <p className="text-white/50 text-sm mt-1">Sign in to your Wertchain account</p>
      </div>
      <form onSubmit={handleSignIn}>
        <div className="mb-[22px]">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-border bg-transparent px-5 py-3 h-auto text-base text-white placeholder:text-white/40 focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:shadow-none transition"
          />
        </div>
        <div className="mb-[22px]">
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-border bg-transparent px-5 py-3 h-auto text-base text-white placeholder:text-white/40 focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:shadow-none transition"
          />
        </div>
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
            {error}
          </div>
        )}
        <div className="mb-6">
          <Button
            type="submit"
            disabled={loading}
            className="bg-primary text-background w-full py-6 rounded-lg text-lg font-medium border border-primary hover:text-primary hover:bg-transparent transition-all duration-300 disabled:opacity-50"
          >
            {loading ? "Signing in…" : "Sign In"}
          </Button>
        </div>
      </form>
      <p className="text-white/50 text-base text-center">
        Don&apos;t have an account?{" "}
        <button
          onClick={() => {
            // trigger signup dialog — handled by parent Header component
            const event = new CustomEvent("openSignUp")
            window.dispatchEvent(event)
          }}
          className="text-primary hover:underline cursor-pointer"
        >
          Sign Up
        </button>
      </p>
    </>
  )
}

export default Signin
