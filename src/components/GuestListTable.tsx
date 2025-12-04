'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { DeleteGuestButton } from "@/components/DeleteGuestButton"
import { EditGuestForm } from "@/components/EditGuestForm"
import { Search } from "lucide-react"

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

export function GuestListTable({ initialGuests }: { initialGuests: Guest[] }) {
    const [searchQuery, setSearchQuery] = useState('')

    // Filter guests based on search query
    const filteredGuests = initialGuests.filter(guest => {
        const query = searchQuery.toLowerCase()
        const fullName = `${guest.firstName} ${guest.lastName}`.toLowerCase()
        const email = guest.email?.toLowerCase() || ''

        return fullName.includes(query) || email.includes(query)
    })

    return (
        <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                    placeholder="Search guests by name or email..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 border-0 border-b border-gray-200 rounded-none focus-visible:ring-0 focus-visible:border-black"
                />
            </div>

            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow className="border-b border-gray-200 hover:bg-transparent">
                            <TableHead className="h-12 px-4 text-left align-middle font-medium text-gray-500 uppercase tracking-widest text-xs">Name</TableHead>
                            <TableHead className="h-12 px-4 text-left align-middle font-medium text-gray-500 uppercase tracking-widest text-xs">Email</TableHead>
                            <TableHead className="h-12 px-4 text-left align-middle font-medium text-gray-500 uppercase tracking-widest text-xs">Phone</TableHead>
                            <TableHead className="h-12 px-4 text-left align-middle font-medium text-gray-500 uppercase tracking-widest text-xs">Relationship</TableHead>
                            <TableHead className="h-12 px-4 text-left align-middle font-medium text-gray-500 uppercase tracking-widest text-xs">Status</TableHead>
                            <TableHead className="h-12 px-4 text-left align-middle font-medium text-gray-500 uppercase tracking-widest text-xs">Details</TableHead>
                            <TableHead className="h-12 px-4 text-right align-middle font-medium text-gray-500 uppercase tracking-widest text-xs">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredGuests.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center text-gray-500">
                                    No guests found matching "{searchQuery}"
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredGuests.map((guest) => (
                                <TableRow key={guest.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                    <TableCell className="p-4 font-serif text-lg">{guest.firstName} {guest.lastName}</TableCell>
                                    <TableCell className="p-4 text-gray-600">{guest.email}</TableCell>
                                    <TableCell className="p-4 text-gray-600">{guest.phone || '-'}</TableCell>
                                    <TableCell className="p-4 text-gray-600 uppercase tracking-wider text-xs">{guest.guestRelationship || '-'}</TableCell>
                                    <TableCell className="p-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider ${guest.rsvpStatus === 'ACCEPTED' ? 'text-green-600 bg-green-50' :
                                                guest.rsvpStatus === 'DECLINED' ? 'text-red-600 bg-red-50' :
                                                    'text-yellow-600 bg-yellow-50'
                                            }`}>
                                            {guest.rsvpStatus}
                                        </span>
                                    </TableCell>
                                    <TableCell className="p-4 text-gray-500 text-sm">
                                        <div className="flex flex-col gap-1">
                                            {guest.mealPreference && (
                                                <span className="text-xs"><span className="uppercase tracking-wider text-gray-400">Meal:</span> {guest.mealPreference}</span>
                                            )}
                                            {guest.dietaryNotes && (
                                                <span className="text-xs"><span className="uppercase tracking-wider text-gray-400">Dietary:</span> {guest.dietaryNotes}</span>
                                            )}
                                            {(guest.city || guest.state) && (
                                                <span className="text-xs"><span className="uppercase tracking-wider text-gray-400">Loc:</span> {[guest.city, guest.state].filter(Boolean).join(', ')}</span>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <EditGuestForm guest={guest} />
                                            <DeleteGuestButton guestId={guest.id} />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
