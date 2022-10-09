import { Global, Module } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Global()
@Module({
  providers: [UsersService, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
