import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { UploadModule } from './upload/upload.module';
import { PModule } from './p/p.module';
import { LoginModule } from './login/login.module';
import { SpiderModule } from './spider/spider.module';
import { UserModule } from './user/user.module';
import { GuardModule } from './guard/guard.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    UploadModule,
    PModule,
    LoginModule,
    SpiderModule,
    UserModule,
    GuardModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '47.103.32.42', // 启动数据库的IP地址/如果在本地启用mysql则用loaclhost即可
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'db',
      synchronize: true, // 数据库同步更新
      autoLoadEntities: true, // 自动加载实体类
    }),
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
