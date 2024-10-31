import { Router } from "express";
import { security_admin } from "../middlewares/security_admin";
import { readUser } from "../controllers/user";

const userRoute = Router()

userRoute.get('/lists',security_admin,readUser)


export default userRoute