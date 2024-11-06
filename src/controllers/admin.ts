import { Request, Response } from "express";
import prisma from "..";
import { hashSync } from "bcrypt";
/***
 * here are the action for admin
 */

export const createAdmin = async (req: Request, res: Response) => {
    const { email, name, first_name, password } = req.body
    let msg = ""
    try {
        let admin = await prisma.administrator.findFirst({ where: { email_admin: email } })
        if (admin) {
            msg = "admin already exist"
            res.status(401).json({ msg })
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

export const readAmin = async (req: Request, res: Response) => {
    try {
        let msg = ""
        const admin = await prisma.administrator.findMany()
        if(!admin){
            msg = "empty list"
            res.status(200).json({msg})
            return
        }
         msg = "here list of admin"
        res.status(200).json({ msg, admin })
        return
    } catch (err) {
        res.status(500).json({ err })
        return
    }
}

export const updateAdmin = async (req: Request, res: Response) => {
    const { email_admin } = req.body
    try {
        let msg = ""
        let admin = await prisma.administrator.findFirst({ where: { email_admin } })
        if (!admin) {
            msg = "admin not found"
            res.status(404).json({ msg })
            return
        }
        admin = await prisma.administrator.update({
            where: { email_admin }, data: {
                ...req.body
            }
        })
        msg = "admin update success"
        res.status(200).json({ msg, admin })
        return
    } catch (err) {
        res.status(500).json({ err })
        return
    }
}


export const deleteAdmin = async (req: Request, res: Response) => {
    const { email_admin } = req.body
    try {
        let msg = ""
        let admin = await prisma.administrator.findFirst({ where: { email_admin } })
        if (!admin) {
            msg = "admin not found"
            res.status(404).json({ msg })
            return
        }
        admin = await prisma.administrator.delete({where:{email_admin}})
        msg = "admin deleted success"
        res.status(200).json({ msg, admin })
        return
    } catch (err) {
        res.status(500).json({ err })
        return
    }
}