'use server'

import { z } from 'zod'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { auth, signIn, signOut } from '@/auth'

const GuestSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email().optional().or(z.literal('')),
    phone: z.string().optional(),
    guestRelationship: z.enum(['GROOM', 'BRIDE', 'BOTH']).optional(),
    rsvpStatus: z.enum(['PENDING', 'ACCEPTED', 'DECLINED']).default('PENDING'),
    mealPreference: z.string().optional(),
    dietaryNotes: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zip: z.string().optional(),
})

export async function addGuest(prevState: any, formData: FormData) {
    const session = await auth()
    if (!session || session.user?.role !== 'ADMIN') {
        return { message: 'Unauthorized' }
    }

    const validatedFields = GuestSchema.safeParse({
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        guestRelationship: formData.get('guestRelationship'),
        address: formData.get('address'),
        city: formData.get('city'),
        state: formData.get('state'),
        zip: formData.get('zip'),
    })

    if (!validatedFields.success) {
        return { message: 'Invalid fields', errors: validatedFields.error.flatten().fieldErrors }
    }

    try {
        // Find the admin user to associate the guest with
        // In a real app, you might want to associate with the logged-in user
        // For now, we'll just use the first admin user found or the session user ID if available
        const userId = session.user.id

        if (!userId) {
            return { message: 'User ID not found in session' }
        }

        await prisma.guest.create({
            data: {
                ...validatedFields.data,
                userId: userId,
            },
        })

        revalidatePath('/admin')
        return { message: 'Guest added successfully' }
    } catch (error) {
        console.error('Failed to add guest:', error)
        return { message: 'Failed to add guest' }
    }
}

export async function deleteGuest(guestId: string) {
    const session = await auth()
    if (!session || session.user?.role !== 'ADMIN') {
        return { message: 'Unauthorized' }
    }

    try {
        await prisma.guest.delete({
            where: { id: guestId },
        })
        revalidatePath('/admin')
        return { message: 'Guest deleted successfully' }
    } catch (error) {
        console.error('Failed to delete guest:', error)
        return { message: 'Failed to delete guest' }
    }
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', {
            ...Object.fromEntries(formData),
            redirectTo: '/admin',
        })
    } catch (error) {
        if ((error as Error).message.includes('CredentialsSignin')) {
            return 'CredentialSignin'
        }
        throw error
    }
}

export async function logout() {
    await signOut()
}
