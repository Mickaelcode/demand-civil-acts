import { Request,Response } from "express";
import prisma from "..";
 
export const createAct = async (req:Request ,res:Response) =>{
    const files = req.files as Express.Multer.File[]
    try{
        
        const fileActe = files.length>1? files.map(fic=>fic.path).join('/') : files[0].path
        console.log({...req.body,fileActe});
        
        const acte = await prisma.acte.create({
            data:{
                ...req.body,
                fileActe
            }
        })
        const msg = "acte created successfully!"
        res.status(200).json({msg,acte})
        return
    }catch(err){
        const msg = "have error !"
        res.status(500).json({msg,err})
        return
    }
}