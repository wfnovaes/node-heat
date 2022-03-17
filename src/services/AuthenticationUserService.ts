import axios from "axios";
import prismaClient from "../prisma/PrismaClient";
import { sign } from "jsonwebtoken"

interface IAccessTokenResponse {
    access_token: string
}

interface IUserDataResponse {
    avatar_url: string,
    login: string,
    id: number,
    name: string
}

class AuthenticationuserService {

    async execute(code: string) {

        const accessTokenUrl = "https://github.com/login/oauth/access_token";

        const { data : accessTokenResponse } = await axios.post<IAccessTokenResponse>(accessTokenUrl, null, {
            params: {
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            },
            headers: {
                Accept: "application/json",
            }
        })
        
        const userUrl = "https://api.github.com/user";
        const { data : userDataResponse } = await axios.get<IUserDataResponse>(userUrl, {
            headers: {
                authorization: `Bearer ${accessTokenResponse.access_token}`
            }
        });

        let user = await prismaClient.user.findFirst({
            where: {
                github_id: userDataResponse.id
            }
        })

        if (!user) {
            user = await prismaClient.user.create({
                data: {
                    github_id: userDataResponse.id,
                    avatar_url: userDataResponse.avatar_url,
                    login: userDataResponse.login,
                    name: userDataResponse.name || "gambiarra"
                }

            });
        }

        const token = sign(
            {
                user: {
                    name: user.name,
                    avatar_url: user.avatar_url,
                    id: user.id
                },
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: "1d"
            }
        );
        

        return { token, user };
    }


}
export { AuthenticationuserService }