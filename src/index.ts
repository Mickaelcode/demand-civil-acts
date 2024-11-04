import express from 'express'
import { PrismaClient } from '@prisma/client'
import routes from './routes'
import cors from "cors"
import multer from 'multer'
import path from 'path'


const app = express()
const prisma = new PrismaClient()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

export const upload = multer({ storage: storage });


app.use('/api', routes)


export default prisma
app.listen(PORT, () => console.log(`running on port ${PORT}`))