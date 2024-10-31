import { Router } from "express";
import { security_admin } from "../middlewares/security_admin";
import { deleteUser, readUser, updateUser } from "../controllers/user";

const userRoute = Router()
/***
 * these root is used by admin 
 * root update is excepted accessed to user and amdin too
 */

userRoute.get('/lists',security_admin,readUser)
userRoute.post('/update',security_admin,updateUser)
userRoute.post('/delete',security_admin,deleteUser)

export default userRoute