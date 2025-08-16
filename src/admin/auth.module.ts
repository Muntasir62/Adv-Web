import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { AdminModule } from "./admin.module";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";


@Module
(
    {
        imports:
        [
            PassportModule.register({defaultStrategy: 'jwt'}),
            JwtModule.register({
                secret: '012345secret',
                signOptions: {expiresIn: '1h'},

                
            }),
            forwardRef(() => AdminModule),
        ],
        providers:[AuthService, JwtStrategy],
        exports: [AuthService, JwtStrategy, PassportModule, JwtModule],
    }
)
export class AuthModule {}