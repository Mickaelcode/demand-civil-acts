import { Request, Response } from "express";
import prisma from "..";

export const createDemand = async (req: Request, res: Response) => {
    const { actDemand, emailAdmin, emailUser, numACte, province, commune, name, firstName, dateOfBirth, placeOfBirth } = req.body;
    const file = req.files as Express.Multer.File[];
    let msg = "";
    try {
        if (file && file.length) {
            const attachment = file.length > 1 ? file.map(fi => fi.path).join('-') : file[0].path;

            const demand = await prisma.demand.create({
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
                },
            });
            msg = "success!";
            res.status(200).json({ msg, demand });
            return 
        } else {
            msg = "attachment required!";
            res.status(400).json({ msg });
            return 
        }
    } catch (err) {
        console.error("Error creating demand:", err);
        res.status(500).json({ error: "Internal server error", details: err });
        return 
    }
};
