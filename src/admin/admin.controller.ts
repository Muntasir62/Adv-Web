import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from "@nestjs/common";
import { adminservice } from "./admin.service";
import { createadmindto } from "./admin.dto";
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
    @Get('query')
    getid(@Query('name') name: string): string
    {
         return this.adminservice.getid(name);
    }
    @Post()
    createadmin(@Body() createadmindto : createadmindto)
    {
        return this.adminservice.createadmin(createadmindto);
    }
    @Get(':id')
    getadmin(@Param('id', ParseIntPipe) adminid : number)
    {
        return this.adminservice.getadmin(adminid);
    }
}