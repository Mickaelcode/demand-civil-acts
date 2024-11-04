import { Request, Response } from "express";
import prisma from "..";

/***
 * here is define the function crud of demands table
 */

export const createDemand = async (req: Request, res: Response) => {
    console.log(req.files);
    const { actDemand,
        emailAdmin,
        emailUser,
        numACte,
        province,
        commune,
        name,
        firstName,
        dateOfBirth,
        placeOfBirth,
        } = req.body
    let file  = req.files as Express.Multer.File[]
    let msg = ""
    try {

        if (file){
            const attachment:string = file.length >1 ? file.map(fi => fi.path).join('-') :  file[0].path
            
            let demand = await prisma.demand.create({
                data: {
                    actDemand,
                    emailAdmin,
                    emailUser,
                    numACte,
                    province,
                    commune,
                    name,
                    firstName,
                    dateOfBirth,
                    placeOfBirth,
                    attachment,

                }
            })
            msg = "sucess!"
            res.status(200).json({msg,demand})
            return
        }
        
        msg = "attachment required!"
        res.status(401).json({msg})
        return
    } catch (err) {
        res.status(501).json(err)
        return
    }
}