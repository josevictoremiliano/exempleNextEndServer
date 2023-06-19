import { PrismaClient } from "@prisma/client";
import { FastifyInstance } from "fastify";

const prisma = new PrismaClient();

export default async function getRoutes(fastify: FastifyInstance) {
    fastify.get('/users', async (request, reply) => {
        const users = await prisma.user.findMany();
        reply.send(users);
    })
    
}
