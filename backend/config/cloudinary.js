
import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

console.log("Cloudinary SDK config:", {
    cloud_name: cloudinary.config().cloud_name,
    api_key: !!cloudinary.config().api_key,
    api_secret: !!cloudinary.config().api_secret
});

const uploadOnCloudinary = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { resource_type: "auto" },
            (error, result) => {
                if (error) {
                    console.error("CLOUDINARY UPLOAD ERROR:", error);
                    return reject(error);
                }

                resolve(result.secure_url);
            }
        );

        stream.end(buffer);
    });
};

export default uploadOnCloudinary;
