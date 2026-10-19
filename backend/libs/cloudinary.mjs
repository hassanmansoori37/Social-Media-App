import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadCloudinary = async (file) => {
    return new Promise((resolve, reject) => {
        //  File buffer (memory) se Cloudinary pe bhejein
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "social_media_posts" }, 
            (error, result) => {
                if (error) {
                    console.log("Cloudinary Error:", error);
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );

        // Buffer ko stream mein end karein
        uploadStream.end(file.buffer); 
    });
}



// import { v2 as cloudinary } from 'cloudinary'

// cloudinary.config({ 
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
//   api_key: process.env.CLOUDINARY_API_KEY, 
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export const uploadCloudinary = async(file) => {
//     return new Promise((resolve, reject) => {
//         try {
//             cloudinary.uploader
//            .upload(file.path)
//            .then(result=> resolve(result));
            
//         } catch (error) {
//             console.log(error);
//             reject(error)
            
            
//         }
//     })

// }

