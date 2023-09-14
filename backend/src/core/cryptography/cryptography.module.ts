import { Module } from '@nestjs/common';
import { HashGenerator, IHashGenerator } from './hash-generator';
import { HashCompare, IHashCompare } from './hash-compare';
import { Encrypter, IEncrypter } from './encrypter';

@Module({
  providers: [
    { provide: IHashGenerator, useClass: HashGenerator },
    { provide: IHashCompare, useClass: HashCompare },
    { provide: IEncrypter, useClass: Encrypter },
  ],
  exports: [
    { provide: IHashGenerator, useClass: HashGenerator },
    { provide: IHashCompare, useClass: HashCompare },
    { provide: IEncrypter, useClass: Encrypter },
  ],
})
export class CryptographyModule {}
