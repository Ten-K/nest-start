import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UploadModule } from './upload/upload.module';
import { PModule } from './p/p.module';
import { LoginModule } from './login/login.module';
import { SpiderModule } from './spider/spider.module';
import { UserModule } from './user/user.module';
import { GuardModule } from './guard/guard.module';

@Module({
  imports: [
    UploadModule,
    PModule,
    LoginModule,
    SpiderModule,
    UserModule,
    GuardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
