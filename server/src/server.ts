import Fastify from 'fastify';
import cors from '@fastify/cors';
import { poolRoutes } from './routes/pool';
import { guessRoutes } from './routes/guess';
import { gameRoutes } from './routes/game';
import { authRoutes } from './routes/auth';
import { userRoutes } from './routes/user';

//  Criando a primeira função para ser executada, usando o fastify para gerenciar as rotas
async function bootstrap() {
    const fastify = Fastify({
        logger: true
    });

    // Configurando cors para aceitar conexão do frontend e mobile com a api
    await fastify.register(cors, {
        origin: true
    });

    // Criando rota para listar quantidade de bolões
    await fastify.register(poolRoutes);

    // Criando a rota da aplicação para autenticação de usuarios
    await fastify.register(authRoutes);
    
    // Criando a rota da aplicação para listar a quantidade de palpites
    await fastify.register(guessRoutes);

    // Criando a rota da aplicação para listar a quantidade de games
    await fastify.register(gameRoutes);

    // Criando a rota da aplicação para listar a quantidade usuarios
    await fastify.register(userRoutes);

    // Configurando aplicação para rodar na porta 3333, host é para permitir funcionar no mobile
    await fastify.listen({ port: 3333, /*host: '0.0.0.0'*/ });
};

bootstrap();