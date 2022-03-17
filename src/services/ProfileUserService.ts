import prismaClient from "../prisma/PrismaClient"

class ProfileUserService {
    async execute(userId: string) {

        const user = await prismaClient.user.findFirst({
            where: {
                id: userId
            }
        });
        return user;
    }

}
export { ProfileUserService }