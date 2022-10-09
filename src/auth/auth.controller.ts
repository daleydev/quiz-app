import { Controller, Post, Body, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { z } from 'zod';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ) { }

    @Post('/signup')
    async signup(
        @Body('password') password: string,
        @Body('email') email: string,
    ): Promise<any> {
        const emailCheck = z.string().email().safeParse(email);
        if (!emailCheck.success) throw new BadRequestException();

        const exist = await this.usersService.getUserByEmail(email);
        if (exist) throw new BadRequestException();

        const hashedPassword = await this.authService.hashPassword(password);

        return this.usersService.createUser(email, hashedPassword);
    }

    @Post('/signin')
    async signin(
        @Body('password') password: string,
        @Body('email') email: string,
    ): Promise<any> {
        const emailCheck = z.string().email().safeParse(email);
        if (!emailCheck.success) throw new BadRequestException();

        const user = await this.usersService.getUserByEmail(email);
        if (!user) throw new NotFoundException();

        const isCorrect = await this.authService.verifyPassword(password, user.passwordHash);

        if (!isCorrect) throw new UnauthorizedException();

        delete user.passwordHash;

        return user;
    }
}
