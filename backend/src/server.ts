import fastify from "fastify";
import { routes } from "./routes";
import { fastifyCors } from "@fastify/cors"

const app = fastify()

app.setErrorHandler((error, request, reply) => {
    reply.code(400).send({ message: error.message})
})

app.register(routes)
app.register(fastifyCors)

app.listen({ port: 3000, host: '0.0.0.0' }).then(() => {
    console.log("Server is running...")
})
