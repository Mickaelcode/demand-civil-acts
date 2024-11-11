import { Router } from "express";
import { security_admin } from "../middlewares/security_admin";
import { upload } from "../middlewares/upload";
import { createDemand, readDemand, updateDemand } from "../controllers/demands";

const demandRoute = Router ()

/**
 * handle crud for demands acts
 */

demandRoute.post('/create',security_admin,upload.array('files'),createDemand)
demandRoute.get('/lists',security_admin,readDemand)
demandRoute.put('/update',upload.array('files'),updateDemand)


export default demandRoute