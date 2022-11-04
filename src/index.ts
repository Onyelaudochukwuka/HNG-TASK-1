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
const options: Options = { limit: "10mb", extended: true };

const app: Application = express();
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
// Define routes
interface Res {
  slackUsername: string;
  backend: boolean;
  age: number;
  bio: string;
}
app.get("/", (req: Request, res: Response<Res>) => {
  res.status(200).json({
    slackUsername: "FUMUDUKUS",
    backend: true,
    age: 18,
    bio: "My Name is Udochukwuka Onyela I'm a student of the university of benin. I'm a fullstack developer and I love to code",
  });
});
interface Req {
  operation_type: string;
  x: number;
  y: number;
}
interface PostRes {
  slackUsername?: string;
  message?: string;
  result?: number;
  operation_type?: string;
}
app.post("/evaluate", (req: Request<Req>, res: Response<PostRes>) => {
  const { operation_type, x, y } = req.body as Req;
  let operator: string = "";
  switch (operation_type) {
    case "addition":
      operator = "+";
      break;
    case "subtraction":
      operator = "-";
      break;
    case "multiplication":
      operator = "*";
      break;
    default:
      if (/add/.test(operation_type)) {
        const valueArr = operation_type.match(/[+-]?\d*/g);
        return res.status(200).json({
          slackUsername: "FUMUDUKUS",
          result: valueArr?.reduce((acc, curr) => acc + Number(curr), 0),
          operation_type: "addition",
        });
      } else if (/subtract/.test(operation_type)) {
        const valueArr = operation_type.match(/[+-]?\d*/g);
        return res.status(200).json({
          slackUsername: "FUMUDUKUS",
          result: valueArr?.reduce((acc, curr) => acc - Number(curr), 0),
          operation_type: "subtraction",
        });
      } else if (/multiply/.test(operation_type)) {
        const valueArr = operation_type.match(/[+-]?\d*/g);
        return res.status(200).json({
          slackUsername: "FUMUDUKUS",
          result: valueArr?.reduce((acc, curr) => acc * Number(curr), 1),
          operation_type: "multiplication",
        });
      } else {
        return res.status(400).json({
          message: "Invalid operation type",
        });
      }
  }
  const result = Function(`return ${x} ${operator} ${y}`);
  res.status(200).json({
    slackUsername: "FUMUDUKUS",
    operation_type,
    result: result(),
  });
});
app.use("*", (req: Request, res: Response<{ message: string }>) => {
  res.status(404).json({
    message: "Route not found",
  });
});
const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => console.log(`port started on Port ${PORT}`));
