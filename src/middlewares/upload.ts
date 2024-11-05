import multer  from 'multer'

const storage = multer.diskStorage({
    destination:function (req,file,cb){
        cb(null,'files/')
    },
    filename:function (req,file,cb){
        // const extension = file.fieldname.split('.')
        const date = Date.now()
        cb(null,date+'-'+file.originalname)
    }
})

 export const upload = multer({storage})
//  export default upload.array('files')=>