import {
  Res,
  Get,
  Post,
  Controller,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { join } from 'path';
import { zip } from 'compressing';
import type { Response } from 'express';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  /**
   * 上传图片
   * @param file 图片信息
   * @returns
   */
  @Post('album')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file) {
    console.log(file);
    return '上传成功';
  }

  /**
   * 以download-api的方式下载图片, 前端直接window.open = '图片路径'下载图片
   * @param res
   */
  @Get('export')
  downLoad(@Res() res: Response) {
    // ../images//1670326886685.jpg为调用上传图片接口上传的图片地址(以dist为根目录)
    const url = join(__dirname, '../images//1670326886685.jpg');
    res.download(url);
  }

  /**
   * 生成图片的流, 提供前端以bold的方式下载
   */
  @Get('stream')
  async down(@Res() res: Response) {
    const url = join(__dirname, '../images//1670326886685.jpg');
    const tarStream = new zip.Stream();
    await tarStream.addEntry(url);
    res.setHeader('Conent-Type', 'application/octet-stream');
    res.setHeader('Content-Disposition', 'attachment; filename=tenk');
    tarStream.pipe(res);
  }
}
