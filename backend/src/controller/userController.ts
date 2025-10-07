import { FastifyRequest, FastifyReply } from 'fastify'
import { UserService } from '../service/userService'

class UserController {
    private userService: UserService

    constructor() {
        this.userService = new UserService()
    }

    // CREATE
    async create(request: FastifyRequest, reply: FastifyReply) {
        const { email, password, date_of_birth } = request.body as { email: string, password: string, date_of_birth: Date }
        const user = await this.userService.create({ email, password, date_of_birth })
        
        reply.status(201).send(user)
    }

    // READ
    async getAll(request: FastifyRequest, reply: FastifyReply) {
        const users = await this.userService.getAll()
        reply.status(200).send(users)
    }

    // DELETE
    async delete(id: string, reply: FastifyReply) {
        const user = await this.userService.delete(id);
        
        if (!user) {
            return reply.status(404).send({ message: 'User not found' });
        }

        return reply.status(204).send({ message: 'User deleted successfully' });
    }
}

export { UserController }