import fastify, { FastifyInstance } from "fastify";
import ShortUniqueId from "short-unique-id";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function poolRoutes(fastify: FastifyInstance) {
    // Criando a rota da aplicação para listar a quantidade de bolões
    fastify.get('/pools/count', async () => {
        const count = await prisma.pool.count();
        return { count };
    });

    // Criando rota da aplicação para criar um novo bolão
    fastify.post('/pools', async (request, response) => {

        // Configurando a validação dos dados para não permitir title nulo
        const createPoolBody = z.object({
            title: z.string()
        });

        const { title } = createPoolBody.parse(request.body);

        // Gerando codigo aleatorio para o bolão
        const generate = new ShortUniqueId({ length: 6 });
        const code = String(generate()).toUpperCase();

        await prisma.pool.create({
            data: {
                title,
                code
            }
        });

        return response.status(201).send({ code });
    });
};