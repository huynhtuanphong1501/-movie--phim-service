import { Module } from '@nestjs/common';
import { DeleteService } from './delete.service';
import { DeleteController } from './delete.controller';
import { PrismaService } from 'src/module-system/prisma/prisma.service';
import { TokenService } from 'src/module-system/token/token.service';
import { TokenModule } from 'src/module-system/token/token.module';

@Module({
  imports: [TokenModule],
  controllers: [DeleteController],
  providers: [DeleteService, PrismaService, TokenService],
})
export class DeleteModule {}
