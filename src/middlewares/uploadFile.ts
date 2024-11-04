import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'files'); // Assurez-vous que ce dossier existe
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = file.mimetype.split('/')[1]; // Obtenir l'extension à partir du nom original
        callback(null, name + Date.now() +'.'+ extension); // Utiliser l'extension correcte
    }
});

export default multer({ storage: storage }).array('files'); // Assurez-vous que 'files' correspond au nom du champ dans le formulaire
