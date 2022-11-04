import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'John Doe',
            email: 'john.doe@gmail.com',
            avatarUrl: 'https://github.com/fanuelcouto99.png'
        }
    });

    const pool = await prisma.pool.create({
        data: {
            title: 'Exemple Pool',
            code: 'BOL123',
            ownerId: user.id,

            // Criando registro na tabela participants, onde o usuario já irá fazer parte do bolão criado
            participants: {
               create: {
                userId: user.id
               } 
            }
        }
    });

    await prisma.game.create({
        data: {
            date: '2022-11-02T20:58:55.243Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR'
        }
    });

    await prisma.game.create({
        data: {
            date: '2022-11-03T14:00:55.243Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'AR',

            // Criando o palpite para o bolão ao criar o bolão
            guesses: {
                create: {
                    firstTeamPoints: 3,
                    secondTeamPoints: 0,

                    // Conectando o participante do bolão ao criar o registro
                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
        }
    });
};

main();