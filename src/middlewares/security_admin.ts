import { NextFunction, Request, Response } from 'express'
import jwt from '../controllers/auth'
import { PRIVATE_KEY } from '../sercrets'


export const security_admin = (req: Request, res: Response, next: NextFunction) => {
    const authorizations = req.headers.authorizations
    let msg = ""
    
    if (!authorizations) {
        msg = "authorization required"
        res.status(301).json({ msg })
        return
    }
    const adminToken: string = authorizations.toString().split(' ')[1]
    try {

        jwt.verify(adminToken, PRIVATE_KEY, (err, decodeToken: any) => {
            if (err) {
                msg = "admin not authorized for this ressources"
                res.status(401).json({ msg })
                return
            }

            const role = decodeToken.role
            if (role !== 'admin') {
                if (req.originalUrl ==='/api/demand/create'|| req.originalUrl ==='/api/demand/update'){
                    next()  
                    return
                }


                msg = "you are not an admin"

                res.status(301).json({msg})
                return
            }

            next()
        })
    } catch (err) {
        res.status(401).json({ err })
    }
}