import { Router } from "express";
import auth_routes from "./auth";
import admin_root from "./admin";

const routes = Router()

routes.use('/user',auth_routes)
routes.use('/admin',admin_root)


export default routes