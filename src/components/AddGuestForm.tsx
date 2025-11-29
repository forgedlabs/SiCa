'use client'

import { useState } from 'react'
import { useFormStatus } from 'react-dom'
import { addGuest } from '@/app/lib/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button
            type="submit"
            disabled={pending}
            className="w-full bg-black text-white rounded-none px-8 py-6 uppercase tracking-widest text-xs hover:bg-gray-800"
        >
            {pending ? 'Adding...' : 'Add Guest'}
        </Button>
    )
}

export function AddGuestForm() {
    const [open, setOpen] = useState(false)
    const [state, setState] = useState<{ message?: string, errors?: any }>({})

    async function clientAction(formData: FormData) {
        const result = await addGuest(null, formData)
        if (result?.message === 'Guest added successfully') {
            setOpen(false)
            setState({})
        } else {
            setState(result)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-black text-white hover:bg-gray-800 rounded-none px-8 py-3 uppercase tracking-widest text-xs">
                    Add Guest
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] bg-white text-black max-h-[90vh] overflow-y-auto">
                <DialogHeader className="border-b border-gray-100 pb-6">
                    <DialogTitle className="font-serif text-3xl">Add New Guest</DialogTitle>
                    <p className="text-gray-500 uppercase tracking-widest text-xs mt-2">Guest Information</p>
                </DialogHeader>
                <form action={clientAction} className="space-y-8 py-6">
                    {/* Name */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="firstName" className="uppercase text-xs tracking-widest text-gray-500">
                                First Name
                            </Label>
                            <Input
                                id="firstName"
                                name="firstName"
                                required
                                className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-black"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName" className="uppercase text-xs tracking-widest text-gray-500">
                                Last Name
                            </Label>
                            <Input
                                id="lastName"
                                name="lastName"
                                required
                                className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-black"
                            />
                        </div>
                    </div>

                    {/* Contact */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="uppercase text-xs tracking-widest text-gray-500">
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-black"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="uppercase text-xs tracking-widest text-gray-500">
                                Phone
                            </Label>
                            <Input
                                id="phone"
                                name="phone"
                                className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-black"
                            />
                        </div>
                    </div>

                    {/* Address */}
                    <div className="space-y-2">
                        <Label htmlFor="address" className="uppercase text-xs tracking-widest text-gray-500">
                            Street Address
                        </Label>
                        <Input
                            id="address"
                            name="address"
                            className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-black"
                        />
                    </div>

                    {/* City, State, Zip */}
                    <div className="grid grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="city" className="uppercase text-xs tracking-widest text-gray-500">
                                City
                            </Label>
                            <Input
                                id="city"
                                name="city"
                                className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-black"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="state" className="uppercase text-xs tracking-widest text-gray-500">
                                State
                            </Label>
                            <Input
                                id="state"
                                name="state"
                                className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-black"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="zip" className="uppercase text-xs tracking-widest text-gray-500">
                                Zip
                            </Label>
                            <Input
                                id="zip"
                                name="zip"
                                className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-black"
                            />
                        </div>
                    </div>

                    {/* Relationship */}
                    <div className="space-y-4">
                        <Label className="uppercase text-xs tracking-widest text-gray-500">
                            Guest Relationship
                        </Label>
                        <RadioGroup name="guestRelationship" className="flex gap-8">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="GROOM" id="groom" />
                                <Label htmlFor="groom" className="font-normal cursor-pointer">Groom</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="BRIDE" id="bride" />
                                <Label htmlFor="bride" className="font-normal cursor-pointer">Bride</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="BOTH" id="both" />
                                <Label htmlFor="both" className="font-normal cursor-pointer">Both</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {state.message && (
                        <p className="text-sm text-red-500">{state.message}</p>
                    )}

                    <div className="pt-4">
                        <SubmitButton />
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
