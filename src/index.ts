import express, {Request,Response} from 'express'
import { PrismaClient } from '@prisma/client'

const app = express() 
const prisma = new PrismaClient()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.get('/',(req:Request,res:Response) =>{
    res.json('hello world')
})

app.post('/user', async (req :Request ,res :Response) =>{
    const {email,name,first_name,password } = req.body
    const user = await prisma.user.create({
        data :{email,name,first_name,password}
    })
    res.json(user)
})

app.get('/users',async (req:Request ,res:Response) =>{
    const users = await prisma.user.findMany()
    res.json(users)
})


app.listen(PORT,() => console.log(`running on port ${PORT}`))