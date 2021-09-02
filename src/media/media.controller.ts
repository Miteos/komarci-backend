import {
  Controller,
  Get,
  Post,
  Param,
  Res,
  UploadedFile,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { editFileName, FileFilter } from '../utils/file-upload.utils';

@Controller('media')
export class MediaController {
  @Post('uploads')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: FileFilter,
    }),
  )
  uploadSingle(@UploadedFile() file) {
    const response = {
      filename: file.filename,
      originalname: file.originalname,
    };
    return response;
  }

  @Get(':imagename')
  getImage(@Param('imagename') image, @Res() res) {
    const response = res.sendFile(image, { root: './uploads' });
    return {
      status: HttpStatus.OK,
      data: response,
    };
  }
}
