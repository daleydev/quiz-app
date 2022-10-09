import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { User } from '@prisma/client';
import { z } from 'zod';


@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { 

    }

    async createUser(email: string, passwordHash: string): Promise<User> {
        return this.prisma.user.create({
            data: {
                email,
                passwordHash,
                isEmailVerified: true // todo
            }
        });
    }

    async getUserByEmail(email: string) {
        return this.prisma.user.findFirst({
            where: {
                email
            }
        });
    }

    
}
