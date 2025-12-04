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

                {/* Stats */}
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
