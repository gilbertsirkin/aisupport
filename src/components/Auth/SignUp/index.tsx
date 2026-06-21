"use client"
import Logo from "@/components/Layout/Header/Logo"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

const SignUp = () => {
  const supabase = createClient()
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [done, setDone] = useState(false)

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (!fullName.trim()) { setError("Full name is required"); return }
    if (!email) { setError("Email is required"); return }
    if (password.length < 8) { setError("Password must be at least 8 characters"); return }
    setLoading(true)
    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName.trim() } },
    })
    setLoading(false)
    if (authError) {
      setError(authError.message)
    } else {
      setDone(true)
    }
  }

  if (done) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4">
          <span className="text-primary text-2xl">✓</span>
        </div>
        <h3 className="text-white text-xl font-semibold mb-2">Check your email</h3>
        <p className="text-white/50 text-sm">
          We sent a confirmation link to <span className="text-white">{email}</span>.
          Click it to activate your account.
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="mb-8 text-center mx-auto inline-block max-w-[160px]">
        <Logo />
      </div>
      <div className="mb-6 text-center">
        <h2 className="text-white text-2xl font-semibold">Create your account</h2>
        <p className="text-white/50 text-sm mt-1">Join Wertchain and start investing</p>
      </div>
      <form onSubmit={handleSignUp}>
        <div className="mb-[22px]">
          <Input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="w-full rounded-md border border-border bg-transparent px-5 py-3 h-auto text-base text-white placeholder:text-white/40 focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:shadow-none transition"
          />
        </div>
        <div className="mb-[22px]">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full rounded-md border border-border bg-transparent px-5 py-3 h-auto text-base text-white placeholder:text-white/40 focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:shadow-none transition"
          />
        </div>
        <div className="mb-[22px]">
          <Input
            type="password"
            placeholder="Password (min 8 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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
            className="flex w-full items-center text-lg font-medium justify-center rounded-md bg-primary px-5 py-6 text-background transition duration-300 ease-in-out hover:bg-transparent hover:text-primary border-primary border disabled:opacity-50"
          >
            {loading ? "Creating account…" : "Create Account"}
          </Button>
        </div>
      </form>
      <p className="text-white/50 mb-4 text-base max-w-2xs mx-auto text-center">
        By creating an account you agree to our{" "}
        <a href="/#legal" className="text-primary hover:underline">Privacy Policy</a>
        {" "}and{" "}
        <a href="/#legal" className="text-primary hover:underline">Terms of Service</a>
      </p>
    </>
  )
}

export default SignUp
