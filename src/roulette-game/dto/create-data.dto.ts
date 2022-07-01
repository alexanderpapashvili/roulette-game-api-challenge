import { IsEnum, IsString } from 'class-validator';

import { GameModes } from './enums/game-modes.enum';

export class CreateDataDTO {
  startingBalance: string | number;

  @IsEnum(GameModes)
  @IsString()
  gameMode: 'NORMAL' | 'TESTING';
}
