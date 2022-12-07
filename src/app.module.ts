import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UploadModule } from './upload/upload.module';
import { PModule } from './p/p.module';
import { LoginModule } from './login/login.module';
import { SpiderModule } from './spider/spider.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UploadModule, PModule, LoginModule, SpiderModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
