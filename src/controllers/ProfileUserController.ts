import {Request, Response} from "express";
import { ProfileUserService } from "../services/ProfileUserService";

class ProfileUserController {

    async handle(request: Request, response: Response) {

        const { user_id } = request.params;

        const profileUserService = new ProfileUserService();
        try {
            const user = await profileUserService.execute(user_id);
            return response.json(user)
        }catch(error) {
            return response.json({"error": error.message})
        }
    }

}
export { ProfileUserController }