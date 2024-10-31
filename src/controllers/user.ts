import { Request, Response } from "express";
import prisma from "..";
import { hashSync } from "bcrypt";


/***
 * here are the action to the user table 
 * Crud of user 
 */


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
        let user = await prisma.user.findFirst({ where: {email} })
        if (!user) {
            msg = "user not found"
            res.status(404).json({ msg })
            return
        }
        user = await prisma.user.update({
            where: { email },
            data: {
                name,
                first_name,
                password: hashSync(password, 10)
            }
        })

        msg = "user updated success"
        res.status(201).json({msg,user})
        return
    } catch (err) {
        res.status(501).json({err})
        return
    }
}

export const deleteUser = async (req:Request ,res:Response) =>{
    const {email} = req.body 
    let msg:string
    try{
        let user = await prisma.user.findFirst({ where: {email} })
        if (!user) {
            msg = "user not found"
            res.status(404).json({ msg })
            return
        }
        user = await prisma.user.delete({where:{email}})
        msg = "user deleted success"
        res.status(200).json({msg,user})
        return
    }catch (err){
        res.status(501).json({err})
        return
    }
}