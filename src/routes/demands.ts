import { Router } from "express";
import { security_admin } from "../middlewares/security_admin";
import { createDemand, deleteDemand,  notificationAdmin, notificationUser, readDemand, updateDemand } from "../controllers/demands";
import { upload } from "../middlewares/upload";
import { security_auth } from "../middlewares/security";


const demandRoute = Router ()

/**
 * handle crud for demands acts
 */

demandRoute.post('/create',security_admin,upload.array('files'),createDemand)
demandRoute.get('/lists',security_admin,readDemand)
demandRoute.put('/update',security_admin,upload.array('files'),updateDemand)
demandRoute.delete('/delete',security_admin,deleteDemand)
demandRoute.get('/notificationAdmin',security_admin,notificationAdmin)
demandRoute.get('/notificationUser',security_auth,notificationUser)

export default demandRoute