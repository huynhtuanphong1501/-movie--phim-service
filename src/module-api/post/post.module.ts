import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { CloudinaryService } from 'src/module-system/cloudinary/cloudinary.service';
import { PrismaService } from 'src/module-system/prisma/prisma.service';
import { TokenModule } from 'src/module-system/token/token.module';
import { TokenService } from 'src/module-system/token/token.service';

@Module({
  imports: [TokenModule],
  controllers: [PostController],
  providers: [PostService, CloudinaryService, PrismaService, TokenService],
})
export class PostModule {}
