"use client"

import { useFormState, useFormStatus } from "react-dom"
import { authenticate } from "@/app/lib/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export default function LoginPage() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined)

    return (
        <div className="flex h-screen w-full items-center justify-center bg-white text-black">
            <div className="w-full max-w-sm p-4">
                <div className="text-center mb-12">
                    <h1 className="font-serif text-4xl mb-2">Login</h1>
                    <p className="text-gray-500 uppercase tracking-widest text-xs">Admin Access</p>
                </div>

                <form action={dispatch} className="space-y-8">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="uppercase text-xs tracking-widest text-gray-500">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                            className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-black placeholder:text-gray-300"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="uppercase text-xs tracking-widest text-gray-500">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-black placeholder:text-gray-300"
                        />
                    </div>

                    <div className="pt-4">
                        <LoginButton />
                    </div>

                    <div
                        className="flex h-8 items-end space-x-1 justify-center"
                        aria-live={"polite" as const}
                        aria-atomic={true}
                    >
                        {errorMessage && (
                            <p className="text-sm text-red-500">{errorMessage}</p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    )
}

function LoginButton() {
    const { pending } = useFormStatus()

    return (
        <Button className="w-full bg-black text-white rounded-none px-8 py-6 uppercase tracking-widest text-xs hover:bg-gray-800" aria-disabled={pending}>
            {pending ? "Logging in..." : "Log in"}
        </Button>
    )
}
