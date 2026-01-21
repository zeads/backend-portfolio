import { v2 as cloudinary } from "cloudinary";
import { AppError } from "../utils/errorHandler";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME || "",
  api_key: process.env.CLOUDINARY_KEY || "",
  api_secret: process.env.CLOUDINARY_SECRET || "",
});

class CloudinaryService {
  async uploadImage(fileBuffer: Buffer, folder: string): Promise<string> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: `portfolio/${folder}` }, (error, result) => {
          if (error)
            return reject(new AppError("Cloudinary Upload Failed", 500));
          resolve(result!.secure_url);
        })
        .end(fileBuffer);
    });
  }

  async deleteImage(publicId: string) {
    await cloudinary.uploader.destroy(publicId);
  }
}

export default new CloudinaryService();
