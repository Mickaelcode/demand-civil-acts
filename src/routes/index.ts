import { Router } from "express";
import auth_routes from "./auth";

const routes = Router()

routes.use('/user',auth_routes)

export default routes