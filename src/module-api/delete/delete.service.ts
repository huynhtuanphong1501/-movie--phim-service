import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from 'src/module-system/prisma/prisma.service';
import { TokenService } from 'src/module-system/token/token.service';


@Injectable()
export class DeleteService {
  constructor(private readonly token: TokenService, private readonly prisma: PrismaService) {}
  async xoaPhim(maPhim: string, token: string) {
    const decode = this.token.verifyAccessToken(token) as {
      tai_khoan: number;
    };
    const nguoiGoi = await this.prisma.nguoiDung.findUnique({
      where: { tai_khoan: decode.tai_khoan },
    });

    if (nguoiGoi?.loai_nguoi_dung !== 'QuanTri') {
      throw new RpcException({
        statusCode: 403,
        message: 'Bạn không có quyền xóa phim',
      });
    }
    const targetPhim = await this.prisma.phim.findFirst({
      where: { ma_phim: Number(maPhim) },
    });

    if (!targetPhim) {
      throw new RpcException({
        statusCode: 404,
        message: 'Phim không tồn tại',
      });
    }
    try {
      await this.prisma.phim.delete({
        where: { ma_phim: targetPhim.ma_phim },
      });
    } catch (err: any) {
      if (err.code === 'P2003') {
        throw new RpcException({
          statusCode: 400,
          message: 'Không thể xóa: Phim này đã có dữ liệu liên quan (đặt vé, v.v.)',
        });
      }
      throw new RpcException({ statusCode: 500, message: 'Lỗi khi xóa phim' });
    }
    return { message: 'Xóa phim thành công' };
  }

}
