import { Router } from "express";
import { createAdmin } from "../controllers/create-admin";
import { login_admin } from "../controllers/auth";
import { security_admin } from "../middlewares/security_admin";

const admin_root = Router()
admin_root.post('/login', login_admin)

/***
 * use security_admin to secure root that only admin use
 */
admin_root.post('/create',security_admin,createAdmin)



export default admin_root