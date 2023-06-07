import { All, Controller } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @All('/')
  async index() {
    return this.appService.index();
  }
}
