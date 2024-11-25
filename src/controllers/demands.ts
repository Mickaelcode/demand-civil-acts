import { Request, Response } from "express";
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
        const data :string[] = []
        demand.forEach(dem => data.push(`id:${dem.id} = attachment: ${dem.attachment.length}`))
        msg =`here the lists of demands(${demand.length}  )`   
        console.log(demand);
             
        res.status(200).json({ msg, data,demand })
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

        // /**
        //  * if the  user paid he must add one file
        //  */
        if(paid){

            let attachment: string[] = [...demand.attachment,files[0].buffer.toString('base64')]
    
            if (!attachment) {
                msg = "file not accepted"
                res.status(401).json({ msg })
                return
            }

            demand = await prisma.demand.update({
                where:{id},
                data:{
                    attachment,
                    status,
                    paid
                }
            })
        } else{
            demand = await prisma.demand.update({
                where:{id},
                data:{
                    status
                }
            })
        }

       

        msg = "update succesfully!"
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
        const data = demands.filter ( demand => (demand.status==='EN_ATTENTE' && demand.paid=="NO") || (demand.status==='ACCEPTE' && demand.attachment.length===3) )
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
         * for user is the demand "En_attente" and "no" paid - "Accapted" and "no" paid - "refused"
         */
        const demands = await prisma.demand.findMany({
            where: {
                OR: [
                    {
                        status:"EN_ATTENTE"
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
