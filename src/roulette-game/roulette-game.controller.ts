import { Body, Controller, Delete, Patch, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { SessionData } from 'express-session';

import { RouletteGameService } from './roulette-game.service';
import { CreateDataDTO } from './dto/create-data.dto';
import { SpinDataDTO } from './dto/spin-data.dto';

@Controller('roulette-game')
export class RouletteGameController {
  constructor(private readonly rouletteGameService: RouletteGameService) {}

  @Post()
  async create(
    @Req() request: Request<SessionData>,
    @Body() data: CreateDataDTO,
  ) {
    return await this.rouletteGameService.create(request, data);
  }

  @Patch()
  async spin(@Req() request: Request<SessionData>, @Body() data: SpinDataDTO) {
    return await this.rouletteGameService.spin(request, data);
  }

  @Delete()
  async end(@Req() request: Request<SessionData>) {
    return await this.rouletteGameService.end(request);
  }
}
