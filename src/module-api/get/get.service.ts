import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaService } from 'src/module-system/prisma/prisma.service';


@Injectable()
export class GetService {
  constructor(private readonly prisma: PrismaService) { }
  async layDanhSachBanner() { 
    return await this.prisma.banner.findMany();
  }

  async layDanhSachPhim(tenPhim: string) {
    if (tenPhim === '' || tenPhim === undefined) { 
      return await this.prisma.phim.findMany();
    }
    const result = await this.prisma.phim.findFirst({
      where: {
        ten_phim: {
          contains: tenPhim
        }
      }
    });
    return result;
  }

  async layDanhSachPhimPhanTrang(data: { soTrang: number; soPhanTuTrenTrang: number; index: number; where: any }) {
    const phim = await this.prisma.phim.findMany({
      where: data.where,
      skip: data.index,
      take: data.soPhanTuTrenTrang
    });
    const total = await this.prisma.phim.count({
      where: data.where
    });

    const totalPages = Math.ceil(total / data.soPhanTuTrenTrang);

    const result = {
      danhSach: phim,
      tongSoNguoiDung: total,
      tongSoTrang: totalPages,
      trangHienTai: data.soTrang,
      soPhanTuTrenTrang: data.soPhanTuTrenTrang,
    }
    return result;
  }

  async layDanhSachPhimTheoNgay(data: {
    soTrang: number;
    soPhanTuTrenTrang: number;
    index: number;
    where: any;
    tuNgay?: string;
    denNgay?: string;
  }) { 
    const { soTrang, soPhanTuTrenTrang, index, where, tuNgay, denNgay } = data;
    const conditions: Record<string, any>[] = [];
    if (where && Object.keys(where).length > 0) conditions.push(where); 

    if (tuNgay || denNgay) {
      const ngayFilter: Record<string, any> = {};
      if (tuNgay) ngayFilter.gte = new Date(tuNgay);
      if (denNgay) ngayFilter.lte = new Date(denNgay);
      conditions.push({ ngay_khoi_chieu: ngayFilter });
    }

    const finalWhere = conditions.length > 0 ? { AND: conditions } : {};

    const phim = await this.prisma.phim.findMany({
      where: finalWhere,
      skip: index,
      take: soPhanTuTrenTrang
    });

    const total = await this.prisma.phim.count({
      where: finalWhere
    });

    const totalPages = Math.ceil(total / data.soPhanTuTrenTrang);

    const result = {
      danhSach: phim,
      tongSoNguoiDung: total,
      tongSoTrang: totalPages,
      trangHienTai: soTrang,
      soPhanTuTrenTrang: soPhanTuTrenTrang,
    }
    return result;
  }

  async layThongTinPhim(maPhim?: number) {
    if (!maPhim) { 
      throw new RpcException({
        statusCode: 400,
        message: "Không tìm thấy tài nguyên!"
      })
    }
    const phim = this.prisma.phim.findFirst({
      where: {
        ma_phim: maPhim,
      }
    })
    return phim;
  }

}
