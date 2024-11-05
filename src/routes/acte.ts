import { Router } from "express";
import { createAct } from "../controllers/acte";
import { upload } from "../middlewares/upload";
import { security_auth } from "../middlewares/security";
// import upload from "../middlewares/upload";

const acteRoute = Router()

/***
 * here handle crud of acte
 */

acteRoute.post('/create',security_auth,upload.array('files'),createAct)


export default acteRoute