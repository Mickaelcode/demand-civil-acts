import { Request , Response } from "express";
import prisma from "..";
import { hashSync } from "bcrypt";



export const createAdmin = async (req: Request, res: Response) => {
    const { email, name, first_name, password } = req.body
    let msg = ""
    try {
        let admin = await prisma.administrator.findFirst({ where: { email_admin:email} })
        if (admin) {
            msg = "admin already exist"
            res.status(401).json({msg})
            return
        }


        admin = await prisma.administrator.create({
            data: {
                email_admin: email,
                name_admin: name,
                first_name_admin: first_name,
                password_admin: hashSync(password, 10)
            }
        })
        msg = "admin created succesfully"
        res.status(200).json({ msg, admin })
        return

    } catch (err) {
        res.status(501).json({ err })
        return
    }

}