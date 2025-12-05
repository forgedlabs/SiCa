import { auth } from "@/auth"
import { Guest } from "@prisma/client"
import prisma from "@/lib/prisma"
import { LogoutButton } from "@/components/LogoutButton"
import { AddGuestForm } from "@/components/AddGuestForm"
import { DeleteGuestButton } from "@/components/DeleteGuestButton"
import { GuestListTable } from "@/components/GuestListTable"
import Link from "next/link"
import { Send } from "lucide-react"

async function getStats() {
    const totalGuests = await prisma.guest.count()
    const attending = await prisma.guest.count({ where: { rsvpStatus: 'ACCEPTED' } })
    const declined = await prisma.guest.count({ where: { rsvpStatus: 'DECLINED' } })
    const pending = await prisma.guest.count({ where: { rsvpStatus: 'PENDING' } })

    return { totalGuests, attending, declined, pending }
}

async function getCeremonyStats() {
    const bothCeremonies = await prisma.guest.count({
        where: { rsvpStatus: 'ACCEPTED', mealPreference: 'both' }
    })
    const traditionalOnly = await prisma.guest.count({
        where: { rsvpStatus: 'ACCEPTED', mealPreference: 'traditional' }
    })
    const receptionOnly = await prisma.guest.count({
        where: { rsvpStatus: 'ACCEPTED', mealPreference: 'reception' }
    })
    const ceremonialExchange = await prisma.guest.count({
        where: { rsvpStatus: 'ACCEPTED', mealPreference: 'ceremonial' }
    })

    return { bothCeremonies, traditionalOnly, receptionOnly, ceremonialExchange }
}

async function getRelationshipStats() {
    const groomGuests = await prisma.guest.count({
        where: { rsvpStatus: 'ACCEPTED', guestRelationship: 'GROOM' }
    })
    const brideGuests = await prisma.guest.count({
        where: { rsvpStatus: 'ACCEPTED', guestRelationship: 'BRIDE' }
    })
    const bothGuests = await prisma.guest.count({
        where: { rsvpStatus: 'ACCEPTED', guestRelationship: 'BOTH' }
    })

    return { groomGuests, brideGuests, bothGuests }
}

async function getLocationStats() {
    const guests = await prisma.guest.findMany({
        where: { rsvpStatus: 'ACCEPTED' },
        select: { city: true, state: true }
    })

    const locationCounts: Record<string, number> = {}
    guests.forEach(guest => {
        const location = [guest.city, guest.state].filter(Boolean).join(', ') || 'Not specified'
        locationCounts[location] = (locationCounts[location] || 0) + 1
    })

    // Sort by count descending and take top 10
    const sortedLocations = Object.entries(locationCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)

    return sortedLocations
}

// Temporary interface to handle stale Prisma types in IDE
interface GuestWithAddress extends Guest {
    address: string | null
    city: string | null
    state: string | null
    zip: string | null
    phone: string | null
    guestRelationship: string | null
}

async function getGuests(): Promise<GuestWithAddress[]> {
    const guests = await prisma.guest.findMany({
        orderBy: { lastName: 'asc' }
    })
    return guests as unknown as GuestWithAddress[]
}

export default async function AdminDashboard() {
    const session = await auth()
    if (!session) return <div>Unauthorized</div>

    const stats = await getStats()
    const ceremonyStats = await getCeremonyStats()
    const relationshipStats = await getRelationshipStats()
    const locationStats = await getLocationStats()
    const guests = await getGuests()

    return (
        <div className="p-8 bg-white min-h-screen text-black">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-end mb-12 border-b border-gray-100 pb-6">
                    <div>
                        <h1 className="font-serif text-4xl mb-2">Dashboard</h1>
                        <p className="text-gray-500 uppercase tracking-widest text-xs">Overview</p>
                    </div>
                    <div className="flex items-center gap-8">
                        <div className="text-sm text-gray-400 uppercase tracking-widest">{session.user?.name}</div>
                        <LogoutButton />
                    </div>
                </div>

                {/* Navigation */}
                <div className="mb-12">
                    <Link
                        href="/admin/notifications"
                        className="inline-flex items-center gap-2 px-6 py-3 border border-black hover:bg-black hover:text-white transition-colors uppercase tracking-widest text-xs"
                    >
                        <Send className="w-4 h-4" />
                        Send Notifications
                    </Link>
                </div>

                {/* RSVP Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
                    <div className="text-center">
                        <div className="text-4xl font-serif mb-2">{stats.totalGuests}</div>
                        <div className="text-xs uppercase tracking-widest text-gray-500">Total Invited</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-serif mb-2 text-green-600">{stats.attending}</div>
                        <div className="text-xs uppercase tracking-widest text-gray-500">Attending</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-serif mb-2 text-red-500">{stats.declined}</div>
                        <div className="text-xs uppercase tracking-widest text-gray-500">Declined</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-serif mb-2 text-yellow-500">{stats.pending}</div>
                        <div className="text-xs uppercase tracking-widest text-gray-500">Pending</div>
                    </div>
                </div>

                {/* Detailed Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">

                    {/* Ceremony Attendance */}
                    <div className="border border-gray-100 p-6">
                        <h3 className="font-serif text-xl mb-6">Ceremony Attendance</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                <span className="text-sm text-gray-600">Both Ceremonies</span>
                                <span className="font-serif text-lg">{ceremonyStats.bothCeremonies}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                <span className="text-sm text-gray-600">Traditional Only</span>
                                <span className="font-serif text-lg">{ceremonyStats.traditionalOnly}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                <span className="text-sm text-gray-600">Reception Only</span>
                                <span className="font-serif text-lg">{ceremonyStats.receptionOnly}</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-sm text-gray-600">Ceremonial Exchange</span>
                                <span className="font-serif text-lg">{ceremonyStats.ceremonialExchange}</span>
                            </div>
                        </div>
                    </div>

                    {/* Guest Relationship */}
                    <div className="border border-gray-100 p-6">
                        <h3 className="font-serif text-xl mb-6">Guest Of</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                <span className="text-sm text-gray-600">Groom's Guests</span>
                                <span className="font-serif text-lg">{relationshipStats.groomGuests}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                <span className="text-sm text-gray-600">Bride's Guests</span>
                                <span className="font-serif text-lg">{relationshipStats.brideGuests}</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-sm text-gray-600">Both</span>
                                <span className="font-serif text-lg">{relationshipStats.bothGuests}</span>
                            </div>
                        </div>
                    </div>

                    {/* Guest Locations */}
                    <div className="border border-gray-100 p-6">
                        <h3 className="font-serif text-xl mb-6">Guest Locations</h3>
                        <div className="space-y-3 max-h-48 overflow-y-auto">
                            {locationStats.length === 0 ? (
                                <p className="text-sm text-gray-400 italic">No location data yet</p>
                            ) : (
                                locationStats.map(([location, count], index) => (
                                    <div key={index} className="flex justify-between items-center py-1 border-b border-gray-50">
                                        <span className="text-sm text-gray-600 truncate mr-4">{location}</span>
                                        <span className="font-serif text-lg flex-shrink-0">{count}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Guest List */}
                <div>
                    <div className="flex justify-between items-end mb-8">
                        <div>
                            <h2 className="font-serif text-2xl mb-2">Guest List</h2>
                            <p className="text-gray-500 uppercase tracking-widest text-xs">Manage RSVPs</p>
                        </div>
                        <AddGuestForm />
                    </div>

                    <GuestListTable initialGuests={guests} />
                </div>
            </div>
        </div>
    )
}
