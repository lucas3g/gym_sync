import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './core/env/env';
import { RegisterModule } from './modules/register/register.module';
import { AuthModule } from './modules/auth/auth.module';
import { EnvModule } from './core/env/env.module';
import { ClientModule } from './modules/client/client.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    EnvModule,
    RegisterModule,
    AuthModule,
    ClientModule,
  ],
})
export class AppModule {}
