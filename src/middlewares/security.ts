import { Request, Response, NextFunction } from "express"
import jwt from "../controllers/auth"
import { PRIVATE_KEY } from "../sercrets"




export const security_auth = (req: Request, res: Response, next: NextFunction) => {
    const authorizations = req.headers.authorizations
    let msg=""
    if (!authorizations) {
         msg = "authorization required!"
        res.status(401).json({ msg })
        return
    }
    const token: string = authorizations.toString().split(' ')[1]
    try {

        jwt.verify(token, PRIVATE_KEY, (err, decodeToken: any) => {
            if (err) {
                msg = "user not authorized for this ressources"
                res.status(401).json({msg})
                return
            }
            if (decodeToken) console.log(decodeToken.user_id);

            next()
        })
    } catch (err) {
        res.status(401).json({err})
    }
}