import fastify, { FastifyInstance } from "fastify";
import { prisma } from "../lib/prisma";

export async function guessRoutes(fastify: FastifyInstance) {
    // Criando a rota da aplicação para listar a quantidade de palpites
    fastify.get('/guesses/count', async () => {
        const count = await prisma.guess.count();
        return { count };
    });
};