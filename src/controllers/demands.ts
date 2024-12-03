import { Request, Response } from "express";
import nodemailer from 'nodemailer'
import prisma from "..";

export const createDemand = async (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[]
    try {
        let msg = ""
        const attachment = files.length <= 1 ? false : files.map(fic => fic.buffer.toString('base64'))
        if (!attachment) {
            msg = "file not accepted"
            res.status(401).json({ msg })
            return
        }
        const demand = await prisma.demand.create({
            data: {
                ...req.body,
                attachment
            }
        })

        msg = "demand created!"
        res.status(200).json({ msg, demand })
        return
    } catch (err) {
        res.status(500).json({ err })
        return

    }
}

export const readDemand = async (req: Request, res: Response) => {
    try {
        let msg = ""
        const demand = await prisma.demand.findMany()
        if (!demand || demand.length === 0) {
            msg = "Empty!"
            res.status(200).json({ msg })
            return
        }
        const data: string[] = []
        demand.forEach(dem => data.push(`id:${dem.id} = attachment: ${dem.attachment.length}`))
        msg = `here the lists of demands(${demand.length}  )`
        console.log(demand);

        res.status(200).json({ msg, data, demand })
        return
    } catch (err) {
        res.status(500).json({ err })
        return
    }
}



export const deleteDemand = async (req: Request, res: Response) => {
    try {
        let msg = ""
        let demand = await prisma.demand.findUnique({ where: { id: Number(req.body) } })
        if (!demand) {
            msg = "demand not found"
            res.status(404).json({ msg })
            return
        }
        demand = await prisma.demand.delete({ where: { id: Number(req.body) } })
        msg = "demand deleted!"
        res.status(200).json({ msg, demand })
        return
    } catch (err) {
        res.status(500).json({ err })
        return
    }
}

export const updateDemand = async (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[]
    const {

        idDemande,
        status,
        paid,

    } = req.body
    try {

        let msg = ""
        const id = Number(idDemande)

        let demand = await prisma.demand.findUnique({ where: { id } })
        if (!demand) {
            msg = "demand not found"
            res.status(404).json({ msg })
            return
        }
        /**
         * here the setting up email
         */
        let emailTransport = nodemailer.createTransport({
            // service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.ADMIN_DEFAULT_EMAIL,
                pass: process.env.ADMIN_DEFAULT_PASSWORD
            }
        })
        let subject = ""
        const userSend = demand.emailUser
        let html = ""
        let attachments : [{}] = [{}]

        emailTransport.verify((err, suc) => {
            if (err) console.log(false);
            else console.log(true);


        })

        // /**
        //  * if the  user paid , he must add one file 
        //  */
        if (files) {

            let attachment: string[] = [...demand.attachment, files[0].buffer.toString('base64')]

            if (!attachment) {
                msg = "file not accepted"
                res.status(401).json({ msg })
                return
            }
            demand = await prisma.demand.update({
                where: { id },
                data: { attachment }
            })
        }

        /***
         * when admin declare user can paid 
         * 
         * the admin can send email to the user 
         */
        else if (paid) {
            subject = "*****CONGRATULATION****"
            html = `<h1 style="font-family:cursive;"> Your demand are succesfully accepted here are your act demand </h1>
             <br><p  style="font-size:1.2em;">Check your <b>notification App</b> to see this </p> 
        
            `
            const act = await prisma.acte.findUnique({where:{numAct:demand.numActe}})
            if(!act){
                msg = "act not match"
                res.status(401).json({msg})
                return
            }
            const content = act.fileActe
            attachments =  [
               
                {   
                    filename: `${demand.emailUser}.jpeg`,
                    content,
                    encoding: 'base64'
                }
             ]

            demand = await prisma.demand.update({
                where: { id },
                data: {
                    paid
                }
            })


        }
        /**
         * if the admin accepte the  and send email
         */
        else {
            if (status === 'ACCEPTE') {

                subject = "*****DEMAND ACCEPTED****"
                 html = `<h1 style="font-family:cursive;color=blue"> Your demand are accepted </h1>
                <br><p  style="font-size:1.2em;"> Please Check your <b>notification App</b> to see this and paid the money to receive your act </p> 
           
               `
            } else {
                subject = "*****DEMAND REJECTED****"
                html = `<h1 style="font-family:cursive;color=red"> Your demand are Refused </h1>
                <br><p style="font-size:1.2em;">We could not accept your demand! <br>Please Check your <b>notification App</b> to see the that </p> 
           
               `
            }

            demand = await prisma.demand.update({
                where: { id },
                data: {
                    status
                }
            })
        }

        /**
         *  the email option to the user 
         */
        const mailOptions = {
            from: process.env.ADMIN_DEFAULT_EMAIL,
            to: userSend,
            subject,
            html,
            attachments
        }
        console.log('Preparing to send email:', mailOptions);

        /**sending the email */
        const info = await emailTransport.sendMail(mailOptions)
        console.log(`email send : ${info.response}`);
        


        msg = `update succesfully! 
        email: ${info} `
        res.status(201).json({ msg, demand })
        return
    } catch (err) {
        res.status(501).json({ err })
        return
    }
}

export const notificationAdmin = async (req: Request, res: Response) => {
    try {
        let msg = ""
        /**
         * for admin is status en attente and no paid or status accepter and no paid
         * but this is a en attente status or no paid 
         */
        const demands = await prisma.demand.findMany({
            where: {
                OR: [
                    {
                        status: "EN_ATTENTE"
                    },
                    {
                        paid: "NO"
                    }
                ]
            }
        })
        if (!demands || demands.length === 0) {
            msg = "Empty!"
            res.status(200).json({ msg })
            return
        }
        const data = demands.filter(demand => (demand.status === 'EN_ATTENTE' && demand.paid == "NO") || (demand.status === 'ACCEPTE' && demand.attachment.length === 3))
        msg = `here the notification(${data.length})`
        res.status(200).json({ msg, data })
        return
    } catch (err) {
        res.status(500).json({ err })
        return
    }
}


export const notificationUser = async (req: Request, res: Response) => {
    try {
        let msg = ""
        /**
         * for user is the demand "En_attente" and "no" paid - "Accapted" and "no" paid - "refused" and "no" paid
         */
        const demands = await prisma.demand.findMany({
            where: {
                OR: [
                    {
                        status: "EN_ATTENTE"
                    },
                    {
                        paid: "NO"
                    }
                ]
            }
        })
        if (!demands || demands.length === 0) {
            msg = "Empty!"
            res.status(200).json({ msg })
            return
        }
        msg = `here the notification(${demands.length})`
        res.status(200).json({ msg, demands })
        return
    } catch (err) {
        res.status(500).json({ err })
        return
    }
}
