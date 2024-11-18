import { Router } from "express";
import { security_admin } from "../middlewares/security_admin";
import { createDemand, deleteDemand, notification, readDemand, updateDemand } from "../controllers/demands";
import multer from "multer";


const demandRoute = Router ()

/**
 * handle crud for demands acts
 */

demandRoute.post('/create',security_admin,multer({}).array('files'),createDemand)
demandRoute.get('/lists',security_admin,readDemand)
demandRoute.put('/update',security_admin,multer({}).array('files'),updateDemand)
demandRoute.delete('/delete',security_admin,deleteDemand)
demandRoute.get('/notification',notification)

export default demandRoute