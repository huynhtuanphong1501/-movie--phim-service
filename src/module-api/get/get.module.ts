import { Module } from '@nestjs/common';
import { GetService } from './get.service';
import { GetController } from './get.controller';
import { PrismaService } from 'src/module-system/prisma/prisma.service';

@Module({
  controllers: [GetController],
  providers: [GetService, PrismaService],
})
export class GetModule {}
