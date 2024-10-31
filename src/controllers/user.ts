import { Request, Response } from "express";
import prisma from "..";
import { hashSync } from "bcrypt";

export const readUser = async (req: Request, res: Response) => {
    let msg = ""
    try {
        const users = await prisma.user.findMany()
        if (!users) {
            msg = "there is empty!"
            res.status(200).json({ msg })
            return
        }
        msg = "there are users"
        res.status(200).json({ msg, users })
        return
    } catch (err) {
        res.status(501).json({ err })
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const { email, name, first_name, password } = req.body
    let msg: string
    try {
        let user = await prisma.user.findFirst({ where: email })
        if (!user) {
            msg = "user not found"
            res.status(404).json({ msg })
        }
        user = await prisma.user.update({
            where: { email },
            data: {
                name,
                first_name,
                password: hashSync(password, 10)
            }
        })

        msg = "user updated successfully"
        res.status(201).json({msg,user})
    } catch (err) {
        res.status(501).json({err})
    }
}