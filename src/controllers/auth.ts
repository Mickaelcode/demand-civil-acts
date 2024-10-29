import { Request, Response } from "express"
import prisma from ".."
import { compareSync, hashSync } from "bcrypt"
import * as jwt from "jsonwebtoken"
import { PRIVATE_KEY } from "../sercrets"

export const sign_up = async (req: Request, res: Response) => {
    const { email, name, first_name, password } = req.body
    let msg = ""
    try {
        let user = await prisma.user.findFirst({ where: { email } })
        if (user) {
            msg = "user already exist"
            res.status(401).json({msg})
            return
        }


        user = await prisma.user.create({
            data: {
                email: email,
                name: name,
                first_name: first_name,
                password: hashSync(password, 10)
            }
        })
        msg = "user created succesfully"
        res.status(200).json({ msg, user })
        return

    } catch (err) {
        res.status(501).json({ err })
        return
    }

}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    let msg = ""
    try {

        const user = await prisma.user.findFirst({ where: { email } })
        if (!user) {
            msg = "user not found"
            res.status(404).json({msg})
            return
        }
        if (!compareSync(password, user.password)) {
            msg = " Wrong password! try again"
            res.status(401).json({msg})
            return
        }
        const token = jwt.sign({
            user_id: user.email
        }, PRIVATE_KEY, {
            expiresIn: '24h'
        })
        msg = "connecting sucess!"
        res.status(200).json({ msg, user, token })
        return
    } catch (err) {
        res.status(501).json({err})
    }
}
export default jwt
