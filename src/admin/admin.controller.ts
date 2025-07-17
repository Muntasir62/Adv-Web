import { Controller, Post } from "@nestjs/common";
import { adminservice } from "./admin.service";
@Controller('admin')
export class admincontroller {
    constructor(private readonly adminservice: adminservice){}
    @Post('signup')
    signup(): string
    {
        return this.adminservice.signup();
    }
    @Post('signin')
    signin(): string
    {
        return this.adminservice.signin();
    }
}