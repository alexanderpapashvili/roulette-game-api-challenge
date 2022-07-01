import { IsArray, IsInt, IsOptional } from 'class-validator';

export class SpinDataDTO {
  @IsArray()
  betInfo: { betAmount: number; betType: number | 'odd' | 'even' }[];

  @IsInt()
  @IsOptional()
  winningNumber: number;
}
