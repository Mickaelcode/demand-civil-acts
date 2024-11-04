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
    let file = req.file

    try {

        if (file) {
            const attachment = file.path

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
        }
        return
    } catch (err) {
        res.json(err)
    }
}