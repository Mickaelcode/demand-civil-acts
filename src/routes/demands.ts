import { Router } from "express";
import { createDemand } from "../controllers/demands";
import multer from "../middlewares/uploadFile";
import auth_routes from "./auth";

const demandRoute = Router()
demandRoute.post('/create', auth_routes ,multer,createDemand)


export default demandRoute