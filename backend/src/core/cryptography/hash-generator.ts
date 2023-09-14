import { Injectable } from '@nestjs/common';
import { hash as bhash } from 'bcryptjs';

export abstract class IHashGenerator {
  abstract hash(plain: string): Promise<string>;
}

@Injectable()
export class HashGenerator implements IHashGenerator {
  async hash(plain: string): Promise<string> {
    return await bhash(plain, 8);
  }
}
