import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import path from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'uploads'), // project-root/uploads
      serveRoot: '/uploads',
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
