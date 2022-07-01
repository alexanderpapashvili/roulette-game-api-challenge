import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { Request } from 'express';
import { SessionData } from 'express-session';

import { CreateDataDTO } from './dto/create-data.dto';
import { SpinDataDTO } from './dto/spin-data.dto';

@Injectable()
export class RouletteGameService {
  async create(request: Request<SessionData>, data: CreateDataDTO) {
    request.session.gameMode = data?.gameMode;

    if (
      data?.gameMode === 'NORMAL' &&
      typeof data.startingBalance === 'string'
    ) {
      verify(data.startingBalance, process.env.JWT_SECRET, (err, decoded) => {
        if (err)
          throw new HttpException(
            'Invalid token! Contact our support team or try later.',
            HttpStatus.NOT_ACCEPTABLE,
          );
        else if (typeof decoded === 'string')
          request.session.startingBalance = parseInt(decoded);
      });
    } else if (
      data?.gameMode === 'TESTING' &&
      typeof data.startingBalance === 'number'
    ) {
      request.session.startingBalance = data.startingBalance;
    } else throw new HttpException('Invalid Input!', HttpStatus.NOT_ACCEPTABLE);

    return 'Data Successfully Updated!';
  }

  async spin(request: Request<SessionData>, data: SpinDataDTO) {
    let totalBetAmount: number = 0;
    data?.betInfo?.map((bet) => {
      totalBetAmount += bet.betAmount;
      if (totalBetAmount >= request.session.startingBalance)
        throw new HttpException(
          'Update your account balance! (not enough money)',
          HttpStatus.FORBIDDEN,
        );
    });

    const winningNumber: { number: number; type: 'odd' | 'even' } = {
      number: data?.winningNumber || Math.random() * (36 - 0) + 0,
      type:
        (data?.winningNumber ?? Math.random() * (36 - 0) + 0) % 2 === 0
          ? 'even'
          : 'odd',
    };
    const winnerBets = [];

    request.session.currentBalance = request.session.startingBalance;

    data?.betInfo?.map(
      (bet: { betAmount: number; betType: number | 'odd' | 'even' }) => {
        if (
          bet.betType === winningNumber.type ||
          bet.betType === winningNumber.number
        )
          winnerBets.push(bet);
        request.session.currentBalance += bet?.betAmount * 2;
      },
    );

    return {
      updatedBallance: request.session.currentBalance,
      winnerBets,
    };
  }

  async end(request: Request<SessionData>) {
    const startBalance = request.session.startingBalance;
    const endBalance = request.session.currentBalance;

    request.session.destroy;

    return {
      startBalance,
      endBalance,
    };
  }
}
