import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DeleteService } from './delete.service';
import { PHIM_PATTERN } from 'src/common/patterns/rabbitmq.pattern';


@Controller()
export class DeleteController {
  constructor(private readonly deleteService: DeleteService) {}

  @MessagePattern(PHIM_PATTERN.XOAPHIM)
  async xoaPhim(@Payload() data: { maPhim: string;  token: string}) {
    return this.deleteService.xoaPhim(data.maPhim, data.token);
  }
}
