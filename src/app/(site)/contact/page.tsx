'use client'

import { useState } from 'react'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const subject = encodeURIComponent(`Wertchain Support — ${name}`)
    const body = encodeURIComponent(`From: ${name} (${email})\n\n${message}`)
    window.location.href = `mailto:support@wertchain.live?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <main className="py-32">
      <div className="container px-4 max-w-xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-3">Contact Us</h1>
        <p className="text-white/60 mb-10">
          Questions about your account, a deposit, or the platform? Reach out and our team will respond as soon as possible.
        </p>

        {sent ? (
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
            <p className="text-white font-medium mb-1">Opening your email client…</p>
            <p className="text-white/50 text-sm">
              If nothing happened, email us directly at{' '}
              <a href="mailto:support@wertchain.live" className="text-primary hover:underline">
                support@wertchain.live
              </a>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm text-white/60 block mb-1.5">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-md border border-border bg-transparent px-4 py-3 text-white placeholder:text-white/30 focus:border-primary focus:outline-none transition"
              />
            </div>
            <div>
              <label className="text-sm text-white/60 block mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-md border border-border bg-transparent px-4 py-3 text-white placeholder:text-white/30 focus:border-primary focus:outline-none transition"
              />
            </div>
            <div>
              <label className="text-sm text-white/60 block mb-1.5">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={5}
                className="w-full rounded-md border border-border bg-transparent px-4 py-3 text-white placeholder:text-white/30 focus:border-primary focus:outline-none transition resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-md bg-primary text-background font-medium hover:bg-transparent hover:text-primary border border-primary transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        )}

        <div className="mt-10 pt-10 border-t border-border text-sm text-white/40">
          <p>Or email us directly: <a href="mailto:support@wertchain.live" className="text-primary hover:underline">support@wertchain.live</a></p>
        </div>
      </div>
    </main>
  )
}
