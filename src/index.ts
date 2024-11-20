import express,{Request,Response} from 'express'
import { PrismaClient } from '@prisma/client'
import routes from './routes'
import cors from "cors"
import { fileUrl } from './middlewares/file'


/***
 * HOW USE THIS API?
 * here are the all of the root : 
 * all the root start with " /api/"
 * 
 *  the Admin root have all privilege for table acte,demand and admin and user(for delete) : 
 *       the demand root start with " / demand/" and there are the root: 
 *                                  -/lists
 *                                  -/delete
 *                                  -/notificationAdmin 
 *                                  
 * 
 * 
 * 
 *       the acte root start with " /act" and there are the root : 
 *                                  -/create
 *                                  -/lists
 *                                  -/update
 *                                  -/delete
 *                              
 * 
 *  the other root is for the admin and the user :
 *                                     -/demand/create
 *                                     -/demand/update
 *                                     -/demand/notificationUser
 * 
 * the user root : 
 *      _/user/signUp
 *      -/login
 *   
 */

const app = express()
const prisma = new PrismaClient()
export const PORT = process.env.PORT || 3000

app.use(cors())
// app.use(express.json())
app.use(express.json({limit:"10mb"}))
app.use(express.urlencoded({limit:"10mb",extended:true}))
app.use('/image',fileUrl)

app.use('/api', routes)


export default prisma
app.listen(PORT, () => console.log(`running on port ${PORT}`))