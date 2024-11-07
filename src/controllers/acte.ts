import { Request, Response } from "express";
import prisma, { PORT } from "..";
import fs from 'fs'

export const createAct = async (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[]
    try {
        const fileActe = files.length > 1 ? files.map(fic => fic.path).join('/') : files[0].path
        const acte = await prisma.acte.create({
            data: {
                ...req.body,
                fileActe
            }
        })
        const msg = "acte created successfully!"
        res.status(200).json({ msg, acte })
        return
    } catch (err) {
        files.forEach(file => {
            fs.unlink(file.path, (err) => {
                console.log(err);
            })
        })
        const msg = "have error !"
        res.status(500).json({ msg, err })
        return
    }
}

export const readAct = async (req: Request, res: Response) => {
    try {
        let msg = ""
        const act = await prisma.acte.findMany()
        if (!act || act.length === 0) {
            msg = "Empty!"
            res.status(200).json({ msg })
            return
        }
        let data = act.map(a => ({ ...a, fileActe: process.env.API_URL! + PORT + '/image/' + a.fileActe.replace('files/', '') }))
        msg = "here list of act"
        res.status(200).json({ msg, data })
        return
    } catch (err) {
        res.status(500).json({ err })
        return
    }
}

export const updateActe = async (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[]
    try {
        const { numAct } = req.body
        const fileActe = files.length > 1 ? files.map(fic => fic.path).join('/') : files[0].path
        let msg = ""
        let act = await prisma.acte.findFirst({ where: { numAct } })
        if (!act) {
            msg = "Act not found!"
            res.status(404).json({ msg })
            return
        }
        fs.unlink(act.fileActe, (err) => {
            if (err) {
                console.log(true);
                msg = "file don't delete!"
                res.status(401).json({ msg })
                return
            }
        })
        act = await prisma.acte.update({
            where: { numAct },
            data: {
                ...req.body,
                fileActe
            }
        })
        msg = "act update successfully!"
        res.status(200).json({ msg, act })
        return
    } catch (err) {
        res.status(500).json({ err })
        return
    }
}

export const deleteActe = async (req: Request, res: Response) => {

    try{
        const {numAct} = req.body
        console.log(numAct);
        
        let msg=  ""
        let act  = await prisma.acte.findFirst({where:{numAct}})
        
        if(!act){
            msg = "act not found"
            res.status(404).json({msg})
            return
        }
        act = await prisma.acte.delete({where:{numAct}})
        fs.unlink(act.fileActe,err=>{
            if (err) {
                msg = "file act not deleted"
                res.status(200).json({msg})
                return
            }
        })
        msg = "act deleted successfully"
        res.status(200).json({msg,act})
        return
    }catch(err){
        res.status(500).json({err})
        return
    }

}