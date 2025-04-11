import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './modules/auth/guards/jwt';

@Module({
  imports: [
    HttpModule,
    PrismaModule,
    AuthModule,
    UsersModule,
  ],
  providers: [{
    provide: APP_GUARD,
    useClass: JwtGuard
  }]
})
export class AppModule { }
