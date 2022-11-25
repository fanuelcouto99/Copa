import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";

export async function authRoutes(fastify: FastifyInstance) {
    fastify.post('/users', async (request) => {
        // Validando a entrada dos dados
        const createUserBody = z.object({
            access_token: z.string()
        });

        const { access_token } = createUserBody.parse(request.body);

        // Conectando com a api do Google, enviado o token vindo do mobile
        const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });

        // Recebendo dados da api
        const userData = await userResponse.json();

        // Validando dados retornodos da api
        const userInfoSchema = z.object({
            id: z.string(),
            // validando se o email está formatado como email
            email: z.string().email(),
            name: z.string(),
            // retornando o endereço da imagem do usuario
            picture: z.string().url(),
        });

        const userInfo = userInfoSchema.parse(userData);

        return { userInfo };
    });
};