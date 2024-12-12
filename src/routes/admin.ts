import { Router } from "express";
import { createAdmin, deleteAdmin, readAmin, updateAdmin } from "../controllers/admin";
import { login_admin } from "../controllers/auth";
import { security_admin } from "../middlewares/security_admin";

const admin_root = Router()
admin_root.post('/login', login_admin)

/***
 * 
 * all handle crud admin
 * use security_admin to secure root that only admin use
 * 
 *  
 */
admin_root.post('/create',security_admin,createAdmin)
admin_root.put('/update',security_admin,updateAdmin)
admin_root.get('/lists',security_admin,readAmin)
admin_root.delete('/delete',security_admin,deleteAdmin)



export default admin_root
