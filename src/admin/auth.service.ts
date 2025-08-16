import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { AdminEntity } from "./admin.entity";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService
{
    constructor
    (
        private readonly adminService : AdminService,
        private readonly jwtService: JwtService,

    ) {}
    async validateAdmin(email : string, password : string): Promise<AdminEntity | null>
    {
        const admin = await this.adminService.findAdminByEmail(email);
        if(admin)
        {
            const isMatch = await bcrypt.compare(password, admin.password);
            if(isMatch)
            {
                return admin;
            }
        }
       return null;
    }
    async login(email: string, password: string): Promise<{ access_token: string }> 
    {
        const admin = await this.validateAdmin(email, password);
        if(!admin)
        {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { email : admin.email, sub : admin.id, accessLevel : admin.accessLevel  };
        return {access_token : this.jwtService.sign(payload),};
    }
}