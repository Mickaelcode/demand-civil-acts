import express,{Request,Response} from 'express'
import { PrismaClient } from '@prisma/client'
import routes from './routes'
import cors from "cors"




const app = express()
const prisma = new PrismaClient()
const PORT = process.env.PORT || 8000

app.use(cors())
app.use(express.json())

app.use('/api', routes)


export default prisma
app.listen(PORT, () => console.log(`running on port ${PORT}`))