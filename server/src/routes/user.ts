import fastify, { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function userRoutes(fastify: FastifyInstance) {
    // Criando a rota da aplicação para listar a quantidade de usuarios
    fastify.get('/users/count', async () => {
        const count = await prisma.user.count();
        return { count };
    });
};