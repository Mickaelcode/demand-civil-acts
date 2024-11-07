import { Request, Response } from "express";
import prisma from "..";

export const createDemand = async (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[]
    try {
        let msg = ""
        const attachment = files.length <= 1 ? false : files.map(fic => fic.path).join('/')
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
        res.status(500).json({ err })
        return

    }
}