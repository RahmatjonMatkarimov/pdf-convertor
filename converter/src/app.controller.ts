import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { writeFileSync } from 'fs';
import { cwd } from 'process';
import path, { join } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('converter')
  @UseInterceptors(FileInterceptor('file'))
  converter(@UploadedFile() file: Express.Multer.File): string {
    const filename = `${path.basename(file.originalname, path.extname(file.originalname))}-${Date.now()}${path.extname(file.originalname)}`
    writeFileSync(join(cwd(), 'uploads', filename), file.buffer)
    return this.appService.converter(filename)
  }
}
