import { Router } from "express";
import { security_admin } from "../middlewares/security_admin";
import { upload } from "../middlewares/upload";
import { createDemand, deleteDemand, readDemand, updateDemand } from "../controllers/demands";

const demandRoute = Router ()

/**
 * handle crud for demands acts
 */

demandRoute.post('/create',security_admin,upload.array('files'),createDemand)
demandRoute.get('/lists',security_admin,readDemand)
demandRoute.put('/update',security_admin,upload.array('files'),updateDemand)
demandRoute.delete('/delete',security_admin,deleteDemand)


export default demandRoute