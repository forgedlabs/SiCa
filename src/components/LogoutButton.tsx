"use client"

import { logout } from "@/app/lib/actions"
import { Button } from "@/components/ui/button"

export function LogoutButton() {
    return (
        <form action={logout}>
            <Button
                type="submit"
                variant="ghost"
                className="uppercase tracking-widest text-xs hover:bg-transparent hover:text-gray-500 p-0"
            >
                Logout
            </Button>
        </form>
    )
}
