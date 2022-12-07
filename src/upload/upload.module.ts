import { extname, join } from 'path';
import { diskStorage } from 'multer';
import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    /** 定义上传文件的存放路径 */
    MulterModule.register({
      storage: diskStorage({
        destination: join(__dirname, '../images'),
        filename: (_, file, callback) => {
          const filename = `${
            new Date().getTime() + extname(file.originalname)
          }`;
          return callback(null, filename);
        },
      }),
    }),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
