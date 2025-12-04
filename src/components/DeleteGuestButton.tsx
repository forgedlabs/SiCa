'use client'

import { deleteGuest } from '@/app/lib/actions'
import { Button } from '@/components/ui/button'
import { Trash2 } from 'lucide-react'
import { useTransition, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export function DeleteGuestButton({ guestId }: { guestId: string }) {
    const [isPending, startTransition] = useTransition()
    const [open, setOpen] = useState(false)

    const handleDelete = () => {
        startTransition(async () => {
            const result = await deleteGuest(guestId)
            if (result?.message && result.message !== 'Guest deleted successfully') {
                // Keep alert for error cases or use a toast if available, 
                // but for now alert is safer than silent failure if toast isn't set up
                alert(result.message)
            }
            setOpen(false)
        })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                    <Trash2 className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white text-black">
                <DialogHeader>
                    <DialogTitle className="font-serif text-2xl">Delete Guest</DialogTitle>
                    <DialogDescription className="text-gray-500">
                        Are you sure you want to delete this guest? This action cannot be undone.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2 sm:gap-0">
                    <Button
                        variant="outline"
                        onClick={() => setOpen(false)}
                        className="rounded-none border-gray-200 uppercase tracking-widest text-xs"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isPending}
                        className="rounded-none bg-red-600 hover:bg-red-700 uppercase tracking-widest text-xs"
                    >
                        {isPending ? 'Deleting...' : 'Delete'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
