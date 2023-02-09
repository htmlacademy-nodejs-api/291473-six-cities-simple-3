import { NextFunction, Request, Response } from 'express';
import { nanoid } from 'nanoid';
import multer, { diskStorage } from 'multer';
import mime from 'mime-types';
import { MiddlewareInterface } from '../../types/middleware.interface.js';

// export class UploadFileMiddleware implements MiddlewareInterface {
//   constructor(
//     private uploadDirectory: string,
//     private fieldName: string,
//   ) { }

//   public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
//     const storage = diskStorage({
//       destination: this.uploadDirectory,
//       filename: (_req, file, callback) => {
//         const extension = mime.extension(file.mimetype);
//         const filename = nanoid();
//         callback(null, `${filename}.${extension}`);
//       }
//     });

//     const uploadSingleFileMiddleware = multer({ storage })
//       .single(this.fieldName);

//     uploadSingleFileMiddleware(req, res, next);
//   }
// }

export class UploadFileMiddleware implements MiddlewareInterface {
  constructor(
    private uploadDirectory: string,
    private fieldName: string,
  ) { }

  public async execute(req: Request, res: Response, next: NextFunction): Promise<void> {
    req.params.files = '';
    const storage = diskStorage({
      destination: this.uploadDirectory,
      filename: (_req, file, callback) => {
        const extension = mime.extension(file.mimetype);
        const filename = nanoid();

        req.params.files += `${filename}.${extension} `;
        console.log('req.params.files from Upload Middleware');
        console.log(req.params.files);

        callback(null, `${filename}.${extension}`);
      }
    });

    const uploadSingleFileMiddleware = multer({ storage })
      .array(this.fieldName);

    uploadSingleFileMiddleware(req, res, next);
  }
}
