import "dotenv/config";
import express, { NextFunction } from "express";
import cors from "cors";

import { MongoClient } from "mongodb";
import { Request, Response } from "express";

import { createCourse } from "./Courses/createCourse";
import { getStudentByEmail } from "./Auth/readUser";
import { createStudent } from "./Auth/createUser"; 
import { json } from "body-parser";

const app = express();
const client = new MongoClient(process.env.MONGODB_URI || "");
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}))

app.use(
  cors({
    origin: "http://127.0.0.1:3000",
    optionsSuccessStatus: 200,
  })
);
app.listen(3001, () => {
  console.log("server running");
});

app.post("/AddCourse", (req:Request, res: Response) => {
 
  if (client) createCourse(client, req.body ??  {}   );
  res.json('{"f":"fff"}')
});


app.get(
  "/signin",
  (req: Request, res: Response, next: NextFunction) => {
    const headers = req.headers;
    const isValid = headers && headers.password && headers.email;
    if (isValid) return next();
    res.status(403);
    res.send(JSON.stringify({ data: "invalid data" }));
  },
  async (req: Request, res: Response) => {
    console.log("loggingIn");
    const user = await getStudentByEmail(
      client,
      String(req.headers?.email) || ""
    );
    if (
      user.success &&
      user.data.length > 0 &&
      user.data[0].password === req.headers.password
    )
      res.send(JSON.stringify(user));
    else res.send(JSON.stringify({ sucess: false, error: "user not found" }));
  }
);

app.get(
  "/signup",
  (req: Request, res: Response, next: NextFunction) => {
    const headers = req.headers;
    const isvalid = headers && headers.password && headers.email;
    if (isvalid) return next();
    res.status(403);
    res.send(JSON.stringify({ data: "invalid data" }));
  },
  async (req: Request, res: Response) => {
    console.log("signingIn");
    const user = await createStudent(
      client,
      String(req.headers?.email) || "",
      String(req.headers?.password) || ""
    );
    console.log(user);
  }
);
