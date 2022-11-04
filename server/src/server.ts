import Fastify from 'fastify';
import cors from '@fastify/cors';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import ShortUniqueId from 'short-unique-id';

const prisma = new PrismaClient({
    log: ['query']
})

//  Criando a primeira função para ser executada, usando o fastify para gerenciar as rotas
async function bootstrap() {
    const fastify = Fastify({
        logger: true
    });

    // Configurando cors para aceitar conexão do frontend e mobile com a api
    await fastify.register(cors, {
        origin: true
    });

    // Criando a rota da aplicação para listar a quantidade de palpites
    fastify.get('/guesses/count', async () => {
        const count = await prisma.guess.count();
        return { count };
    });

    // Criando a rota da aplicação para listar a quantidade de usuarios
    fastify.get('/users/count', async () => {
        const count = await prisma.user.count();
        return { count };
    });

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

        const generate = new ShortUniqueId({length: 6});
        const code = String(generate()).toUpperCase();

        await prisma.pool.create({
            data: {
                title,
                code 
            }
        });

        return response.status(201).send({ code });
    });

    // Configurando aplicação para rodar na porta 3333, host é para permitir funcionar no mobile
    await fastify.listen({ port: 3333, /*host: '0.0.0.0'*/ });
};

bootstrap();