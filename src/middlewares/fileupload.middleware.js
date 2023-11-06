//middleware to handle PDF file upload
import multer from "multer";

const storageConfig = multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, 'public/PDF/')
    },
    filename:(req,file,cb) => {
        const name = Date.now() + "_" + file.originalname;
        cb 
        (null, name);
    }
});

export const uploadFile = multer({storage: storageConfig})