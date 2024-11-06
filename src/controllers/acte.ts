import { Request, Response } from "express";
import prisma, { PORT } from "..";
import fs from 'fs'

export const createAct = async (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[]
    try {

        const fileActe = files.length > 1 ? files.map(fic => fic.path).join('/') : files[0].path
        console.log({ ...req.body, fileActe });

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
        let data = act.map(a => ({ ...a, fileActe: process.env.API_URL!+ PORT +'/image/'+a.fileActe.replace('files/','') }))

        msg = "here list of act"

        res.status(200).json({ msg, data })
        return


    } catch (err) {
        res.status(500).json({ err })
        return
    }
} 