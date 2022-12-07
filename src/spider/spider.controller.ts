import { Get, Controller } from '@nestjs/common';
import { SpiderService } from './spider.service';

@Controller('spider')
export class SpiderController {
  constructor(private readonly spiderService: SpiderService) {}
  @Get()
  findAll() {
    return this.spiderService.findAll();
  }
}
