'use client'

import { deleteGuest } from '@/app/lib/actions'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useTransition } from 'react'

export function DeleteGuestButton({ guestId }: { guestId: string }) {
    const [isPending, startTransition] = useTransition()

    return (
        <Button
            variant="ghost"
            size="icon"
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
            disabled={isPending}
            onClick={() => {
                if (confirm('Are you sure you want to delete this guest?')) {
                    startTransition(async () => {
                        await deleteGuest(guestId)
                    })
                }
            }}
        >
            <Trash2 className="h-4 w-4" />
        </Button>
    )
}
