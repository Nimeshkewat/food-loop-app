import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { Request } from "express";

//* Define a custom interface or type to include Multer's file property
interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

const uploadToCloudinary = (req: MulterRequest): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    if (!req.file?.buffer) {
      return reject(new Error("No file buffer found on the request object."));
    }

    const stream = cloudinary.uploader.upload_stream(
      { folder: "Restaurant_image" },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        if (!result) {
          return reject(new Error("Cloduinary upload failed with no result."));
        }
        resolve(result);
      },
    );
    stream.end(req.file?.buffer);
  });
};

export default uploadToCloudinary;
