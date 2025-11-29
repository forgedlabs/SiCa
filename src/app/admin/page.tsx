import { auth } from "@/auth"
import { PrismaClient, Guest } from "@prisma/client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LogoutButton } from "@/components/LogoutButton"
import { AddGuestForm } from "@/components/AddGuestForm"
import { DeleteGuestButton } from "@/components/DeleteGuestButton"

const prisma = new PrismaClient()

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

                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="border-b border-gray-200 hover:bg-transparent">
                                    <TableHead className="h-12 px-4 text-left align-middle font-medium text-gray-500 uppercase tracking-widest text-xs">Name</TableHead>
                                    <TableHead className="h-12 px-4 text-left align-middle font-medium text-gray-500 uppercase tracking-widest text-xs">Email</TableHead>
                                    <TableHead className="h-12 px-4 text-left align-middle font-medium text-gray-500 uppercase tracking-widest text-xs">Phone</TableHead>
                                    <TableHead className="h-12 px-4 text-left align-middle font-medium text-gray-500 uppercase tracking-widest text-xs">Relationship</TableHead>
                                    <TableHead className="h-12 px-4 text-left align-middle font-medium text-gray-500 uppercase tracking-widest text-xs">Status</TableHead>
                                    <TableHead className="h-12 px-4 text-left align-middle font-medium text-gray-500 uppercase tracking-widest text-xs">Ceremony</TableHead>
                                    <TableHead className="h-12 px-4 text-left align-middle font-medium text-gray-500 uppercase tracking-widest text-xs">Address</TableHead>
                                    <TableHead className="h-12 px-4 text-right align-middle font-medium text-gray-500 uppercase tracking-widest text-xs">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {guests.map((guest) => (
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
                                        <TableCell className="p-4 text-gray-600 capitalize">{guest.mealPreference || '-'}</TableCell>
                                        <TableCell className="p-4 text-gray-500 text-sm">
                                            <div className="flex flex-col">
                                                <span>{guest.address}</span>
                                                <span>{[guest.city, guest.state, guest.zip].filter(Boolean).join(', ')}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="p-4 text-right">
                                            <DeleteGuestButton guestId={guest.id} />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}
