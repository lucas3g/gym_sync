import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export abstract class IEncrypter {
  abstract encrypt(payload: Record<string, unknown>): Promise<string>;
}

@Injectable()
export class Encrypter implements IEncrypter {
  constructor(private jwtService: JwtService) {}

  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }
}
