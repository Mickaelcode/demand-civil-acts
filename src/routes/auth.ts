import { Router } from "express";
import { login, sign_up } from "../controllers/auth";
import { security_auth } from "../middlewares/security";

const auth_routes:Router = Router()

auth_routes.post('/singUp',security_auth,sign_up)
auth_routes.post('/login',login)

export default auth_routes