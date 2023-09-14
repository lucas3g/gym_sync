import { Module } from '@nestjs/common';
import { ClientController } from './presenter/controllers/client.controller';

@Module({
  controllers: [ClientController],
})
export class ClientModule {}
