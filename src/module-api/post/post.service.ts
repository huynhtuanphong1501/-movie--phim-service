import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { CloudinaryService } from 'src/module-system/cloudinary/cloudinary.service';
import { PrismaService } from 'src/module-system/prisma/prisma.service';
import { TokenService } from 'src/module-system/token/token.service';


@Injectable()
export class PostService {
  constructor(private prisma: PrismaService, private cloudinary: CloudinaryService, private token: TokenService) { }
  async themPhimUploadHinh(data:any) {
    try {

      const buffer = Buffer.from(
        data.file.buffer,
        'base64',
      );

      const file: Express.Multer.File =
        {
          buffer,
          originalname: data.file.originalname,
          mimetype: data.file.mimetype,
          fieldname: 'frm',
          encoding: '7bit',
          size: buffer.length,
          destination: '',
          filename:data.file.originalname,
          path: '',
          stream: null as any,
        };

      const result = await this.cloudinary.upload(file);

      const phim = await this.prisma.phim.create({
          data: {
            ten_phim: data.tenPhim,
            trailer: data.trailer,
            mo_ta: data.moTa,
            hinh_anh: result.secure_url,
            hot: false,
            dang_chieu: false,
            sap_chieu: false,
          },
        });
      return {
        statusCode: 201,
        message: 'Thêm phim thành công',
        data: phim,
      };
    } catch (error) {
      console.error('themPhimUploadHinh error:',error);
      throw new RpcException({
        statusCode: 400,
        message: "thêm phim thất bại"
      }
      );
    }
  }

  async capNhatPhimUpload(data: any) {
    const token = data.token || '';
    try {
      if (!token) {
        throw new RpcException({
          statusCode: 401,
          message: 'Không có token',
        });
      }

      const user = this.token.verifyAccessToken(token) as {
        tai_khoan: number;
      };
      if (!user) {
        throw new RpcException({
          statusCode: 401,
          message: 'Token không hợp lệ',
        });
      }

      const checkRole = await this.prisma.nguoiDung.findFirst({
        where: {
          tai_khoan: user.tai_khoan,
        },
      });

      if (!checkRole) {
        throw new RpcException({
          statusCode: 404,
          message: 'Không tìm thấy người dùng',
        });
      }

      if (checkRole.loai_nguoi_dung !== 'QuanTri') {
        throw new RpcException({
          statusCode: 403,
          message: 'Bạn không có quyền cập nhật phim',
        });
      }

      const phim = await this.prisma.phim.findFirst({
        where: {
          ma_phim: Number(data.maPhim),
        },
      });

      if (!phim) {
        throw new RpcException({
          statusCode: 404,
          message: 'Không tìm thấy phim',
        });
      }

      let hinhAnh = phim.hinh_anh;

      if (data.file) {
        const buffer = Buffer.from(data.file.buffer, 'base64');

        const file: Express.Multer.File = {
          buffer,
          originalname: data.file.originalname,
          mimetype: data.file.mimetype,
          fieldname: 'frm',
          encoding: '7bit',
          size: buffer.length,
          destination: '',
          filename: data.file.originalname,
          path: '',
          stream: null as any,
        };

        const result = await this.cloudinary.upload(file);
        hinhAnh = result.secure_url;
      }

      const phimUpdated = await this.prisma.phim.update({
        where: {
          ma_phim: Number(data.maPhim),
        },

        data: {
          ten_phim: data.tenPhim,
          trailer: data.trailer,
          mo_ta: data.moTa,
          hinh_anh: hinhAnh,
          ngay_khoi_chieu: data.ngayKhoiChieu,
          danh_gia: data.danhGia,
          hot: data.hot,
          dang_chieu: data.dangChieu,
          sap_chieu: data.sapChieu,
        },
      });
      return {
        statusCode: 201,
        message: 'Cập nhật phim thành công',
        data: phimUpdated,
      };
    } catch (error) {
      console.error('capNhatPhim error:',error);
      throw new RpcException({
        statusCode: 400,
        message: "cập nhật phim thất bại"
      }
      );
    }
  }

}
