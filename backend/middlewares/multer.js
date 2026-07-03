// import multer from "multer"
// const storage=multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,"./public")
//     },
//     filename:(req,file,cb)=>{
//         cb(null,file.originalname);
//     }
// })
// export const upload=multer({storage});
import multer from "multer"

// memoryStorage keeps the file only in RAM as a buffer — never touches disk
const storage = multer.memoryStorage();
export const upload = multer({ storage });
