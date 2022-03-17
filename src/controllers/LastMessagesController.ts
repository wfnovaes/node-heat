import {Request, Response} from "express";
import { LastMessagesService } from "../services/LastMessagesService";

class LastMessagesController {

    async handle(request: Request, response: Response) {

        const numbersOfMessages = Number(request.query.size || 3);
        const lastMessageService = new LastMessagesService();
        try {
            const result = await lastMessageService.execute(numbersOfMessages);
            return response.json(result)
        }catch(error) {
            return response.json({"error": error.message})
        }
    }

}
export { LastMessagesController }