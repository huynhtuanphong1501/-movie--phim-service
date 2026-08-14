import {
  Injectable,
} from '@nestjs/common';

import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  async upload(
    file: Express.Multer.File,
  ) {
    return new Promise<any>(
      (resolve, reject) => {
        const uploadStream =
          cloudinary.uploader.upload_stream(
            {
              folder: 'phim',
            },

            (error, result) => {
              if (error) {
                reject(error);
                return;
              }

              resolve(result);
            },
          );

        uploadStream.end(file.buffer);
      },
    );
  }
}