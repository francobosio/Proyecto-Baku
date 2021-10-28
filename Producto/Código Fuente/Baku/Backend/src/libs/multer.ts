import multer from 'multer';
import { v4 as uuid } from 'uuid';
import path from 'path'

const storage = multer.diskStorage({
//    destination: (req, file, cb) => { // setting destination of uploading files        
//        if (file.fieldname === "resume") { // if uploading resume
//          cb(null, 'resumes');
//       } else { // else uploading image
//       cb(null, 'images');
//        }
//      }
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, uuid() + path.extname(file.originalname));
    }
})

export default multer({storage});