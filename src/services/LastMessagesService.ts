import prismaClient from "../prisma/PrismaClient"

class LastMessagesService {
    async execute(size: number) {

        const messages = await prismaClient.message.findMany({
            take: size,
            orderBy: {
                created_at: "desc",
            },
            include: {
                user: true
            }
        });
        return messages;
    }

}
export { LastMessagesService }