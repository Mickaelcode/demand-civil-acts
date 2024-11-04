import { Router } from "express";
import { login, sign_up } from "../controllers/auth";

const auth_routes:Router = Router()

auth_routes.post('/signUp',sign_up)
auth_routes.post('/login',login)



export default auth_routes