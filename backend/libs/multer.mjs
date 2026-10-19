import multer from "multer";

// Vercel ke liye memoryStorage zaroori hai
const storage = multer.memoryStorage();

export const multerMiddleware = multer({ 
    storage: storage,
    limits: { fileSize: 4 * 1024 * 1024 } // 4MB limit (Vercel ki limit se thoda kam)
});

// import multer from "multer";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads');
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9) + '-' + file.originalname;
//     cb(null, "image" + '-' + uniqueSuffix);
//   },
// });

// export const multerMiddleware = multer({ storage: storage });

