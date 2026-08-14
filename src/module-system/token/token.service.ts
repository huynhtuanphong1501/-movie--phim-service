import { Injectable } from "@nestjs/common";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET_KEY, JWT_REFRESH_SECRET } from "../../common/constants/app.constant";
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class TokenService { 
    signAccessToken(tai_khoan) {
    if (!tai_khoan) {
        throw new RpcException({ statusCode: 401, message: 'user không tồn tại để tạo token'});
    }
    const payload = { tai_khoan: tai_khoan };
    const accessToken = jwt.sign(payload, JWT_SECRET_KEY as string, {
      expiresIn: '1h',
    });
    return accessToken;
  }

  signRefreshToken(tai_khoan) {
    if (!tai_khoan) {
       throw new RpcException({ statusCode: 401, message: 'user không tồn tại để tạo token'});
    }

    // refreshToken <=> RT (ghi tắt)
    const refreshToken = jwt.sign(
      { tai_khoan: tai_khoan },
      JWT_REFRESH_SECRET as string,
      {
        expiresIn: '1d',
      },
    );

    return refreshToken;
  }

  verifyAccessToken(acccessToken, option?: jwt.VerifyOptions) {
    const decode = jwt.verify(acccessToken, JWT_SECRET_KEY as string, option);
    return decode;
  }
  verifyRefreshToken(refreshToken, option?: jwt.VerifyOptions) {
    const decode = jwt.verify(refreshToken, JWT_REFRESH_SECRET as string, option);
    return decode;
  }
}