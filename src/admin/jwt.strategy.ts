import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { AdminService } from "./admin.service";
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy)
{
    constructor(private readonly adminService: AdminService) {
        super({
             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
             ignoreExpiration: false,
              secretOrKey: '012345secret',
             
        });
    }
    async validate (payload : any)
    {
         const admin = await this.adminService.findAdminByEmail(payload.email);
    if (!admin) {
      throw new UnauthorizedException();
    }
    return { id: payload.sub, email: payload.email, accessLevel: payload.accessLevel };
  }
    }
