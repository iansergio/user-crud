import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { UserController } from "./controller/userController";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    const userController = new UserController();

    fastify.post('/users', async (request: FastifyRequest, reply: FastifyReply) => {
        await userController.create(request, reply)
    })

    fastify.get('/users', async (request: FastifyRequest, reply: FastifyReply) => {
        await userController.getAll(request, reply)
    })

    fastify.delete('/users/:id', async (request: FastifyRequest, reply: FastifyReply) => {
        const { id } = request.params as { id: string }
        await userController.delete(id, reply)
    })
}
