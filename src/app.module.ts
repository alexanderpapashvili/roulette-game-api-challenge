import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RouletteGameModule } from './roulette-game/roulette-game.module';

@Module({
  imports: [
    JwtModule.register({ secret: process.env.JWT_SECRET }),
    ConfigModule.forRoot({ isGlobal: true }),
    RouletteGameModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
