import { Request, Response } from "express";
import prisma from "..";

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