'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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
import { COUNTRIES } from "@/lib/countries"
import { Pencil } from 'lucide-react'

interface Guest {
    id: string
    firstName: string
    lastName: string
    email: string | null
    phone: string | null
    address: string | null
    city: string | null
    state: string | null
    zip: string | null
    guestRelationship: string | null
    rsvpStatus: string
    mealPreference: string | null
    dietaryNotes: string | null
}

export function EditGuestForm({ guest }: { guest: Guest }) {
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true)
        setError(null)

        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData.entries())

        try {
            const response = await fetch(`/api/guests/${guest.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new Error('Failed to update guest')
            }

            setOpen(false)
            router.refresh()
        } catch (err) {
            setError('Failed to update guest. Please try again.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <span className="sr-only">Edit guest</span>
                    <Pencil className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] bg-white text-black max-h-[90vh] overflow-y-auto">
                <DialogHeader className="border-b border-gray-100 pb-6">
                    <DialogTitle className="font-serif text-3xl">Edit Guest</DialogTitle>
                    <p className="text-gray-500 uppercase tracking-widest text-xs mt-2">Update Information</p>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-8 py-6">
                    {/* Name */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="firstName" className="uppercase text-xs tracking-widest text-gray-500">
                                First Name
                            </Label>
                            <Input
                                id="firstName"
                                name="firstName"
                                defaultValue={guest.firstName}
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
                                defaultValue={guest.lastName}
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
                                defaultValue={guest.email || ''}
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
                                defaultValue={guest.phone || ''}
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
                            defaultValue={guest.address || ''}
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
                                defaultValue={guest.city || ''}
                                className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-black"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="state" className="uppercase text-xs tracking-widest text-gray-500">
                                Country
                            </Label>
                            <select
                                id="state"
                                name="state"
                                defaultValue={guest.state || ''}
                                className="w-full border-0 border-b border-gray-200 bg-transparent py-2 text-sm focus:ring-0 focus:border-black rounded-none"
                            >
                                <option value="">Select country</option>
                                {COUNTRIES.map((country) => (
                                    <option key={country} value={country}>{country}</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="zip" className="uppercase text-xs tracking-widest text-gray-500">
                                Zip
                            </Label>
                            <Input
                                id="zip"
                                name="zip"
                                defaultValue={guest.zip || ''}
                                className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-black"
                            />
                        </div>
                    </div>

                    {/* Relationship & RSVP */}
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <Label className="uppercase text-xs tracking-widest text-gray-500">
                                Guest Relationship
                            </Label>
                            <RadioGroup name="guestRelationship" defaultValue={guest.guestRelationship || undefined}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="GROOM" id="edit-groom" />
                                    <Label htmlFor="edit-groom" className="font-normal cursor-pointer">Groom</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="BRIDE" id="edit-bride" />
                                    <Label htmlFor="edit-bride" className="font-normal cursor-pointer">Bride</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="BOTH" id="edit-both" />
                                    <Label htmlFor="edit-both" className="font-normal cursor-pointer">Both</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <div className="space-y-4">
                            <Label className="uppercase text-xs tracking-widest text-gray-500">
                                RSVP Status
                            </Label>
                            <RadioGroup name="rsvpStatus" defaultValue={guest.rsvpStatus}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="PENDING" id="edit-pending" />
                                    <Label htmlFor="edit-pending" className="font-normal cursor-pointer">Pending</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="ACCEPTED" id="edit-accepted" />
                                    <Label htmlFor="edit-accepted" className="font-normal cursor-pointer">Accepted</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="DECLINED" id="edit-declined" />
                                    <Label htmlFor="edit-declined" className="font-normal cursor-pointer">Declined</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    {/* Ceremony Attendance (stored in mealPreference) */}
                    <div className="space-y-2">
                        <Label htmlFor="mealPreference" className="uppercase text-xs tracking-widest text-gray-500">
                            Ceremony Attendance
                        </Label>
                        <select
                            name="mealPreference"
                            defaultValue={guest.mealPreference || ''}
                            className="w-full border-0 border-b border-gray-200 bg-transparent py-2 text-sm focus:ring-0 focus:border-black rounded-none"
                        >
                            <option value="" disabled>Select ceremony attendance</option>
                            <option value="both">Both Ceremonies</option>
                            <option value="traditional">Traditional Ceremony Only</option>
                            <option value="reception">Ceremonial Exchange & Reception Only</option>
                        </select>
                    </div>

                    {/* Dietary Notes */}
                    <div className="space-y-2">
                        <Label htmlFor="dietaryNotes" className="uppercase text-xs tracking-widest text-gray-500">
                            Dietary Notes
                        </Label>
                        <Input
                            id="dietaryNotes"
                            name="dietaryNotes"
                            defaultValue={guest.dietaryNotes || ''}
                            className="border-0 border-b border-gray-200 rounded-none px-0 focus-visible:ring-0 focus-visible:border-black"
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-500">{error}</p>
                    )}

                    <div className="pt-4">
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-black text-white rounded-none px-8 py-6 uppercase tracking-widest text-xs hover:bg-gray-800"
                        >
                            {isLoading ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
