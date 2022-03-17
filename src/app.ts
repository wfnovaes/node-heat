import "dotenv/config";
import express from "express";
import http from "http";
import cors from "cors";
import { router } from "./router";
import { Server } from "socket.io";

const app = express();

app.use(express.json());
app.use(router);
app.use(cors);

app.get("/github", (request, response) => {
    response.redirect(
        `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
    );
});

app.get("/singin/callback", (resquest, response) => {
    const { code } = resquest.query;

    return response.json(code);
});

const serverHttp = http.createServer(app);
const io = new Server(serverHttp, {
    cors: {
        origin: "*"
    }
});

io.on("connection", socket => {
    console.log(`User connected on socket ${socket.id}`);
})

export { serverHttp, io }