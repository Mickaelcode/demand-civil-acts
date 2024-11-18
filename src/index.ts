import express,{Request,Response} from 'express'
import { PrismaClient } from '@prisma/client'
import routes from './routes'
import cors from "cors"
import { fileUrl } from './middlewares/file'




const app = express()
const prisma = new PrismaClient()
export const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use('/image',fileUrl)

app.use('/api', routes)


export default prisma
app.listen(PORT, () => console.log(`running on port ${PORT}`))