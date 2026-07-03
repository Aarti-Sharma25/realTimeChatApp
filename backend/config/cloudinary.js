// import {v2 as cloudinary } from 'cloudinary';
// import fs from "fs";
// const uploadOnCloudinary=async (filePath)=>{
//     // Configuration
//     cloudinary.config({ 
//         cloud_name:process.env.CLOUD_NAME, 
//         api_key:process.env.API_KEY, 
//         api_secret:process.env.API_SECRET // Click 'View API Keys' above to copy your API secretr
//        })
//        try {
        


//     // Upload an image
//      const uploadResult = await cloudinary.uploader.upload(filePath)
//      fs.unlinkSync(filePath);
//      return uploadResult.secure_url;
          
//        } catch (error) {
//         fs.unlinkSync(filePath);
//         console.log(error);
//         throw error;
//        }
//     }
//     export default uploadOnCloudinary
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const uploadOnCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { resource_type: "auto" },
            (error, result) => {
                if (error) return reject(error);
                resolve(result.secure_url);
            }
        );
        stream.end(buffer);
    });
};

export default uploadOnCloudinary;
