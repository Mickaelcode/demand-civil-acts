import { Request, Response } from "express";
import prisma ,{PORT} from "..";
import fs from "fs"

export const createDemand = async (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[]
    try {
        let msg = ""
        const attachment = files.length <= 1 ? false : files.map(fic => fic.path).join('~')
        if (!attachment) {
            msg = "file not accepted"
            res.status(401).json({ msg })
            return
        }
        console.log({...req.body,attachment});
        
        const demand = await prisma.demand.create({
            data: {
                ...req.body,
                attachment
            }
        })
    
        msg = "demand created!"
        res.status(200).json({ msg, demand })
        return
    } catch (err) {
        files.forEach(file =>{
            fs.unlink(file.path,(err) =>{
                console.log(err);
                
            })
        })
        res.status(500).json({ err })
        return

    }
}

export const readDemand = async (req: Request, res: Response) => {
    try {
        let msg = ""
        const demand = await prisma.demand.findMany()
        if (!demand || demand.length === 0) {
            msg = "Empty!"
            res.status(200).json({ msg })
            return
        }
        let data = demand.map(a => ({ ...a, attachment: a.attachment.split('~').map(att => process.env.API_URL!+PORT+'/image/'+att.replace('files/','') )}))
        msg = "here list of demand"
        res.status(200).json({ msg, data })
        return
    } catch (err) {
        res.status(500).json({ err })
        return
    }
}

export const deleteDemand = async (req:Request,res:Response) =>{
    try{
        let msg = ""
        let demand = await prisma.demand.findUnique({where:{id:req.body}})
        if(!demand){
            msg = "demand not found"
            res.status(404).json({msg})
            return
        }
        demand = await prisma.demand.delete({where:{id:req.body}})
        msg = "demand deleted!"
        res.status(200).json({msg,demand})
        return
    }catch(err){
        res.status(500).json({err})
        return
    }
}

export const updateDemand = async (req:Request,res:Response) =>{
    try{
        console.log(req.body);
        
        let msg = ""
        const id = req.body.id
        const files  = req.files as Express.Multer.File[]
        const attachment = files.length <= 1 ? false : files.map(fic => fic.path).join('~')
        if (!attachment) {
            msg = "file not accepted"
            res.status(401).json({ msg })
            return
        }
        let demand = await prisma.demand.findUnique({where:{id}})
        if(!demand){
            msg = "demand not found"
            res.status(404).json({msg})
            return
        }
        fs.unlink(demand.attachment,err =>{
            if(err){
                msg = "file error !"
                res.status(401).json({msg})
                return
            }
        })
        demand = await prisma.demand.update({
            where:{id},
            data:{
                ...req.body,
                attachment
            }
        })
    }catch(err){

    }
}