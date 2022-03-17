import {Request, Response} from "express";
import { AuthenticationuserService } from "../services/AuthenticationUserService";

class AuthenticationuserController {

    async handle(request: Request, response: Response) {
        console.log(request.body);
        const { code } = request.body;

        const service = new AuthenticationuserService();
        try {
            const result = await service.execute(code);
            return response.json(result);
        } catch (error) {
            return response.json({"error" : error.message})
        }

    }

}
export { AuthenticationuserController }