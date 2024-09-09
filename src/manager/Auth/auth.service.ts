import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ManagerService } from '../manager.service';
import { ManagerDTO, loginDTO } from '../dto/manager.dto';
import { ManagerEntity } from '../entities/manager.entity';

@Injectable()
export class AuthService {
    constructor(
        private customerService: ManagerService,
        private jwtService: JwtService
    ) { }
    async signUp(myobj: ManagerDTO): Promise<ManagerDTO> {
        return await this.customerService.addManager(myobj);
    }

    async signIn(logindata: loginDTO): Promise<{ access_token: string }> {
        const user = await this.customerService.findOne(logindata);
        if (!user) {
            throw new Error('User not found');
        }
        const isMatch = await bcrypt.compare(logindata.password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }
        const payload = logindata;
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}