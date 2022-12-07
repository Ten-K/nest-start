import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UploadModule } from './upload/upload.module';
import { PModule } from './p/p.module';
import { LoginModule } from './login/login.module';

@Module({
  imports: [UploadModule, PModule, LoginModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
