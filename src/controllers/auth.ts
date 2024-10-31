import { Request, Response } from "express"
import prisma from ".."
import { compareSync, hashSync } from "bcrypt"
import * as jwt from "jsonwebtoken"
import { PRIVATE_KEY } from "../sercrets"

/**
 * 
 * @param req 
 * @param res 
 * @returns 
 * the root /sign-up  is used by user or citizens * 

 * 
 */
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

/**
 * 
 * @param req 
 * @param res 
 * @returns 
 * the root /login is used too by user
 * in this root  we give a token that have : email and role(user) that expired on 24h
 * 
 */

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


/***
 * here is the login of administrator ;
 * we give a token with role admin and email
 */

export const login_admin = async (req:Request , res:Response) =>{

    const { email_admin, password ,role } = req.body
    let msg = ""
    try {

        const admin = await prisma.administrator.findFirst({ where: { email_admin } })
        if (!admin) {
            msg = "you are not admin!please leave here!"
            res.status(404).json({msg})
            return
        }
        if (!compareSync(password, admin.password_admin)) {
            msg = " Wrong password! try again"
            res.status(401).json({msg})
            return
        }
        const admin_token = jwt.sign({
            admin_id: admin.email_admin,
            role
        }, PRIVATE_KEY, {
            expiresIn: '24h'
        })
        msg = "connecting sucess!"
        res.status(200).json({ msg, admin, admin_token,role })
        return
    } catch (err) {
        res.status(501).json({err})
    }
}


export default jwt
