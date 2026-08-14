import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './module-system/prisma/prisma.module';
import { GetModule } from './module-api/get/get.module';
import { PostModule } from './module-api/post/post.module';
import { TokenModule } from './module-system/token/token.module';
import { DeleteModule } from './module-api/delete/delete.module';

@Module({
  imports: [PrismaModule, GetModule, PostModule, TokenModule, DeleteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
