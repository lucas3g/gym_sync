import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { HashGenerator, IHashGenerator } from '../cyptography/hash-generator';

@Module({
  providers: [
    PrismaService,
    { provide: IHashGenerator, useClass: HashGenerator },
  ],
  exports: [
    PrismaService,
    { provide: IHashGenerator, useClass: HashGenerator },
  ],
})
export class DatabaseModule {}
