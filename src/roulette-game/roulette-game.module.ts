import { Module } from '@nestjs/common';
import { RouletteGameService } from './roulette-game.service';
import { RouletteGameController } from './roulette-game.controller';

@Module({
  controllers: [RouletteGameController],
  providers: [RouletteGameService]
})
export class RouletteGameModule {}
