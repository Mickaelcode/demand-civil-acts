import { Request, Response } from "express";
import prisma from "..";

export const createAct = async (req: Request, res: Response) => {
    const {
        numAct,
        typeActe,
        province,
        nameCommune,
        nameCit,
        firstNameCit,
        dateOB,
        placeOB,
        delivrance,
        father,
        mother,
    } = req.body
    const file = req.files as Express.Multer.File[]
    try {
        let msg = ""
        if (file) {
            const fileActe = file.length === 1 ? file[0].path : false
            if (fileActe) {
                const act = await prisma.acte.create({
                    data: {
                        numAct,
                        typeActe,
                        province,
                        nameCommune,
                        nameCit,
                        firstNameCit,
                        dateOB,
                        placeOB,
                        delivrance,
                        father,
                        mother,
                        fileActe,

                    }
                })
                msg = "acte created successfully!"
                res.status(200).json({ msg, act })
                return
            }
            msg = "one file not more!"
            res.status(404).json({msg})
            return
        }
    } catch (err) {
        res.json(501).json({err})
    }
}