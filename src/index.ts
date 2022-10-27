import express, { Application, Request, Response } from "express";
require("dotenv").config();
const cors = require("cors");
interface Server {
    init?: () => void;
}
const server: Server = {};
type Options = {
    limit: string;
    extended: boolean;
};
const options:Options = { limit: "10mb", extended: true };

const app: Application = express();
app.use(cors({
    origin: "*"
}));
app.use(express.json());
// Define routes
interface Res{
    slackUsername: string;
    backend: boolean;
    age: number;
    bio: string;
}
app.get("/", (req: Request, res: Response<Res>) => {
    res.status(200).json({
                slackUsername: "Onyela Udochukwuka",
                backend: true,
                age: 18,
                bio: "My Name is Udochukwuka Onyela I'm a student of the university of benin. I'm a fullstack developer and I love to code"
    })
});
app.use("*", (req: Request, res: Response<{message: string}>) => {
    res.status(404).json({
        message: "Route not found"
    })
});
const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => console.log(`port started on Port ${PORT}`));
