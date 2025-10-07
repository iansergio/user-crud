import { PrismaClient } from '@prisma/client'

class UserService {
    private prismaClient: PrismaClient

    constructor() {
        this.prismaClient = new PrismaClient()
    }

    // CREATE
    async create({ email, password, date_of_birth }: User) {
        if (!email || !password) {
            throw new Error("Fill all fields.")
        }

        const user = await this.prismaClient.user.create({
            data: {
                email,
                password,
                date_of_birth: new Date(date_of_birth),
                created_at: new Date(Date.now())
            }
        })

        return user
    }

    // READ
    async getAll() {
        const users = await this.prismaClient.user.findMany()
        return users
    }

    // DELETE
    async delete(id: string) {
        const user = await this.prismaClient.user.findUnique({ where: { id } })
        if (!user) throw new Error("User not found.")

        return this.prismaClient.user.delete({ where: { id } })
    }
}

export { UserService }
