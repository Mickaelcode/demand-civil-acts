import { Router } from "express";
import { security_admin } from "../middlewares/security_admin";
import { upload } from "../middlewares/upload";
import { createDemand } from "../controllers/demands";

const demandRoute = Router ()

/**
 * handle crud for demands acts
 */

demandRoute.post('/create',upload.array('files'),createDemand)


export default demandRoute