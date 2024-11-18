import { Request, Response } from "express";
import prisma from "..";

export const createDemand = async (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[]
    try {
        let msg = ""
        const attachment = files.length <= 1 ? false : files.map(fic => fic.buffer.toString('base64'))
        if (!attachment ) {
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
        msg = "here list of demand"
        console.log({...demand});
        
        res.status(200).json({ msg, demand })
        return
    } catch (err) {
        res.status(500).json({ err })
        return
    }
}



export const deleteDemand = async (req:Request,res:Response) =>{
    try{
        let msg = ""
        let demand = await prisma.demand.findUnique({where:{id:req.body}})
        if(!demand){
            msg = "demand not found"
            res.status(404).json({msg})
            return
        }
        demand = await prisma.demand.delete({where:{id:req.body}})
        msg = "demand deleted!"
        res.status(200).json({msg,demand})
        return
    }catch(err){
        res.status(500).json({err})
        return
    }
}

export const updateDemand = async (req:Request,res:Response) =>{
    const files  = req.files as Express.Multer.File[]
    const {
        
        idDemande  ,
        actDemand ,
        emailAdmin,
        emailUser ,
        numActe,
      
        province  ,
        commune  ,
        name     ,
        firstName  ,
        dateOfBirth ,
        placeOfBirth ,
        
      
        status ,
        paid,

    } = req.body
    try{
        
        let msg = ""
        const id = Number(idDemande)
        console.log(id);
        
        let demand = await prisma.demand.findUnique({where:{id}})
        if(!demand){
            msg = "demand not found"
            res.status(404).json({msg})
            return
        }
        
        // /**
        //  * if the update add file ,add this with the two local 
        //  * 
        //  */
        let  attachment :string[]
        switch(files.length){
            case 1: attachment = [...demand.attachment,files[0].buffer.toString('base64')]
                    break
            case 2: attachment = files.map(fic => fic.buffer.toString('base64'))
                    break
            default: attachment = [...demand.attachment]
                    break
        }
        
        if (!attachment) {
            msg = "file not accepted"
            res.status(401).json({ msg })
            return
        }
        const createdAt = demand.createdAt

        demand = await prisma.demand.update({
            where:{id},
            data:{
                actDemand,
                emailAdmin,
                emailUser,
                numActe,
                province,
                commune,
                name,
                firstName,
                dateOfBirth,
                placeOfBirth,
                attachment,
                createdAt,
                status,
                paid
            }
        })
        console.log(`the updated demand: ${demand}`);
        
        msg = "update succesfully!"
        res.status(201).json({msg,demand})
        return
    }catch(err){
        res.status(501).json({err})
        return
    }
}
    export const notification = async (req:Request,res:Response) =>{
        try {
            let msg = ""
            const demand = await prisma.demand.findMany({
                where:{
                    OR:[
                        {
                            status:"EN_ATTENTE"
                        },
                        {
                            paid : "NO"
                        }
                    ]
                }
            })
            if (!demand || demand.length === 0) {
                msg = "Empty!"
                res.status(200).json({ msg })
                return
            }
            // let data = demand.map(a => ({ ...a, attachment: a.attachment.split('~').map(att => process.env.API_URL!+PORT+'/image/'+att.replace('files/','') )}))
            msg = "here the notification"
            // res.status(200).json({ msg, data })
            return
        } catch (err) {
            res.status(500).json({ err })
            return
        }
    }
    
    