import { Router } from "express";
import { AuthenticationuserController } from "./controllers/AuthenticationUserController";
import { LastMessagesController } from "./controllers/LastMessagesController";
import { MessageController } from "./controllers/MessagesController";
import { ensureAuthentication } from "./middleware/ensureAuthentication";

const router = Router();

router.post("/authenticate", new AuthenticationuserController().handle);
router.post("/messages", ensureAuthentication, new MessageController().handle);
router.get("/messages", new LastMessagesController().handle);


export { router };