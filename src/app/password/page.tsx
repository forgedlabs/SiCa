"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Loader2, Lock } from "lucide-react"

export default function PasswordPage() {
    const router = useRouter()
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")

        try {
            const res = await fetch("/api/auth/site-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password })
            })

            if (res.ok) {
                router.push("/")
                router.refresh()
            } else {
                setError("Incorrect password. Please try again.")
            }
        } catch {
            setError("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-md text-center">
                {/* Logo */}
                <div className="mb-8">
                    <Image
                        src="/hero/1.jpg"
                        alt="Simon & Catherine"
                        width={120}
                        height={120}
                        className="mx-auto rounded-full object-cover"
                    />
                </div>

                {/* Names */}
                <div className="mb-8">
                    <p className="font-serif text-3xl tracking-widest uppercase">Simon</p>
                    <p className="font-serif text-2xl my-2">&</p>
                    <p className="font-serif text-3xl tracking-widest uppercase">Catherine</p>
                </div>

                {/* Password Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            className="w-full pl-12 pr-4 py-4 border border-black text-center uppercase tracking-widest text-sm focus:outline-none focus:ring-1 focus:ring-black"
                            autoFocus
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading || !password}
                        className="w-full py-4 bg-black text-white uppercase tracking-widest text-sm hover:bg-gray-800 disabled:bg-gray-300 transition-colors"
                    >
                        {loading ? (
                            <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                        ) : (
                            "Enter"
                        )}
                    </button>
                </form>

                <p className="mt-8 text-xs text-gray-400 uppercase tracking-widest">
                    For invited guests only
                </p>
            </div>
        </div>
    )
}
