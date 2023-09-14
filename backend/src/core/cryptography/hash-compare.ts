import { Injectable } from '@nestjs/common';
import { compare as bcompare } from 'bcryptjs';

export abstract class IHashCompare {
  abstract compare(plain: string, hash: string): Promise<boolean>;
}

@Injectable()
export class HashCompare implements IHashCompare {
  async compare(plain: string, hash: string): Promise<boolean> {
    return await bcompare(plain, hash);
  }
}
