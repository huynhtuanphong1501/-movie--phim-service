import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PostService } from './post.service';
import { PHIM_PATTERN } from 'src/common/patterns/rabbitmq.pattern';

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @MessagePattern(PHIM_PATTERN.THEMPHIMUPLOADHINH)
  themPhimUploadHinh(@Payload() data:any) {
    return this.postService.themPhimUploadHinh(data);
  }

  @MessagePattern(PHIM_PATTERN.CAPNHATPHIMUPLOAD)
  capNhatPhimUpload(@Payload() data:any) {
    return this.postService.capNhatPhimUpload(data);
  }

}
