import { Router } from "express";
import auth_routes from "./auth";
import admin_root from "./admin";
import userRoute from "./user";
import demandRoute from "./demands";

const routes = Router()

/**
 * root for login user and amdin 
 * 
 * root for sign up admin
 */
routes.use('',auth_routes)
routes.use('/admin',admin_root)
routes.use('/demands',demandRoute)


/**
 * root for admin authorizations (excepted update)
 * CRUD for all the table
 * 
 */


routes.use('/user',userRoute)
export default routes