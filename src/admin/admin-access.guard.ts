import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
@Injectable()
export class AdminAccessGuard implements CanActivate 
{
    constructor (private reflector : Reflector) {}
    canActivate(context: ExecutionContext): boolean 
     {
        const requiredAccessLevel = this.reflector.get<string>('accessLevel', context.getHandler());
        if(!requiredAccessLevel)
        {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        if(!user || !user.accessLevel)
        {
            throw new ForbiddenException('Access denied');
        }
        if(requiredAccessLevel === 'super_admin' && user.accessLevel !== 'super_admin')
        {
            throw new ForbiddenException('Super admin access required');
        }
        return true;

        
    }

}