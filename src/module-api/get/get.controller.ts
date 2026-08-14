import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GetService } from './get.service';
import { PHIM_PATTERN } from 'src/common/patterns/rabbitmq.pattern';


@Controller()
export class GetController {
  constructor(private readonly getService: GetService) {}

  @MessagePattern(PHIM_PATTERN.LAYDANHSACHBANNER)
  layDanhSachBanner() {
    return this.getService.layDanhSachBanner();
  }

  @MessagePattern(PHIM_PATTERN.LAYDANHSACHPHIM)
  layDanhSachPhim(@Payload() tenPhim: string) {
    return this.getService.layDanhSachPhim(tenPhim);
  }

  @MessagePattern(PHIM_PATTERN.LAYDANHSACHPHIMPHANTRANG)
  layDanhSachPhimPhanTrang(@Payload() data: { soTrang: number; soPhanTuTrenTrang: number; index: number; where: any }) {
    return this.getService.layDanhSachPhimPhanTrang(data);
  }

  @MessagePattern(PHIM_PATTERN.LAYDANHSACHPHIMTHEONGAY)
  layDanhSachPhimTheoNgay(@Payload() data: {
    soTrang: number;
    soPhanTuTrenTrang: number;
    index: number;
    where: any;
    tuNgay?: string;
    denNgay?: string;
  }) {
    return this.getService.layDanhSachPhimTheoNgay(data);
  }

  @MessagePattern(PHIM_PATTERN.LAYTHONGTINPHIM)
  layThongTinPhim(@Payload() maPhim: number) {
    return this.getService.layThongTinPhim(maPhim);
  }

}
