import { Router } from "express";
import { createAct, deleteActe, readAct, updateActe } from "../controllers/acte";
import { upload } from "../middlewares/upload";
import { security_auth } from "../middlewares/security";
import { security_admin } from "../middlewares/security_admin";
// import upload from "../middlewares/upload";
import multer from "multer";

const acteRoute = Router()

/***
 * here handle crud of acte
 */

// acteRoute.post('/create',security_auth,upload.array('files'),createAct)
acteRoute.post('/create',security_auth,multer({}).array('files'),createAct)
acteRoute.get('/lists',security_admin,readAct)
acteRoute.put('/update',security_admin,multer({}).array('files'),updateActe)
acteRoute.delete('/delete',security_admin,deleteActe)

export default acteRoute