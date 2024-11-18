import { Request, Response } from "express";
import prisma, { PORT } from "..";
import fs from 'fs'

export const createAct = async (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[]
    try {
        
        if (! files || files.length===0){
            const msg  = "file required"
            res.status(401).json({msg})
            return
        }
        const fileActe = files[0].buffer.toString('base64')
       console.log(fileActe)
        let acte = await prisma.acte.findUnique({where:{numAct:req.body.numAct}})        
        if(acte){
            const msg  = "Act already exist!"
            res.status(401).json({msg})
            return
        }
         acte = await prisma.acte.create({
            data: {
                ...req.body,
                fileActe
            }
        })
        
        const msg = "acte created successfully!"
        res.status(200).json({ msg,  acte })
        return
    } catch (err) {
        const msg = "have error !"
        res.status(500).json({ msg, err })
        return
    }
}

export const readAct = async (req: Request, res: Response) => {
    try {
        let msg = ""
        const act = await prisma.acte.findMany()
        if (!act || act.length === 0) {
            msg = "Empty!"
            res.status(200).json({ msg })
            return
        }
        msg = "here list of act"
        res.status(200).json({ msg, act })
        return
    } catch (err) {
        res.status(500).json({ err })
        return
    }
}


export const updateActe = async (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[] | undefined;
    try {
        const { numAct } = req.body;
        let msg = '';
        let act = await prisma.acte.findFirst({ where: { numAct } });
        if (!act) {
            msg = 'Act not found!';
            res.status(404).json({ msg });
            return 
        }

        let fileActe;
        if (!files || files.length === 0) {
            // Si aucun fichier n'est envoyé, on garde l'ancien fichier
            fileActe = act.fileActe;
        } else {
            // Si des fichiers sont envoyés, on les traite
            fileActe = files.length > 1 ? files.map(fic => fic.path).join('/') : files[0].path;

            // Supprimer l'ancien fichier
            try {
                await new Promise<void>((resolve, reject) => {
                    fs.unlink(act!.fileActe, (err) => {
                        if (err) reject('File not deleted');
                        else resolve();
                    });
                });
            } catch (deleteError) {
                msg = "File couldn't be deleted!";
                res.status(400).json({ msg: deleteError });
                return
            }
        }

        // Mise à jour de l'acte dans la base de données
        act = await prisma.acte.update({
            where: { numAct },
            data: {
                ...req.body,
                fileActe
            }
        });

        msg = 'Act updated successfully!';
        res.status(200).json({ msg, act });
        return 
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err || 'Internal server error' });
        return 
    }
};

export const deleteActe = async (req: Request, res: Response) => {

    try{
        const {numAct} = req.body
        console.log(numAct);
        
        let msg=  ""
        let act  = await prisma.acte.findFirst({where:{numAct}})
        
        if(!act){
            msg = "act not found"
            res.status(404).json({msg})
            return
        }
        act = await prisma.acte.delete({where:{numAct}})
        fs.unlink(act.fileActe,err=>{
            if (err) {
                msg = "file act not deleted"
                res.status(200).json({msg})
                return
            }
        })
        msg = "act deleted successfully"
        res.status(200).json({msg,act})
        return
    }catch(err){
        res.status(500).json({err})
        return
    }

}