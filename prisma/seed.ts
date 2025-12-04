import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    // Delete old admin if exists
    try {
        await prisma.user.delete({
            where: { email: 'admin@example.com' }
        })
        console.log('Deleted old admin user')
    } catch (e) {
        // Ignore if not found
    }

    const email = 'admin@sicalovestory.com'
    const password = 'SimonwedsCathy'
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.upsert({
        where: { email },
        update: {
            password: hashedPassword,
        },
        create: {
            email,
            password: hashedPassword,
            name: 'Admin',
            role: 'ADMIN',
        },
    })

    console.log({ user })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
