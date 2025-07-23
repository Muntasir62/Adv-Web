import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, Res, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { adminservice } from "./admin.service";
import { createadmindto } from "./admin.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage, MulterError } from "multer";

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
    @Post('/addadmin')
    @UsePipes(new ValidationPipe())
    addadmin(@Body() data: createadmindto): string
    {
        console.log(data)
        return this.adminservice.addadmin(data);
    }

   /* @Post('upload')
@UseInterceptors(FileInterceptor('file'))
uploadFile(@UploadedFile() file: Express.Multer.File) 
{
console.log(file.size);
}
*/
@Post('upload')
@UseInterceptors(FileInterceptor('file',
{ fileFilter: (req, file, cb) => {
if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
cb(null, true);
else {
cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'file'), false);
}
},
limits: { fileSize: 300000 },
storage:diskStorage({
destination: './uploads',
filename: function (req, file, cb) {
cb(null,Date.now()+file.originalname)
},
})
}))
uploadFile(@UploadedFile() file: Express.Multer.File ,@Body() userdata: object ) :void {
console.log(file);
console.log(file.size);
console.log(userdata);
console.log(file.destination)
}
@Get('/getimage/:name')
getImages(@Param('name') name, @Res() res) {
res.sendFile(name,{ root: './uploads' })
}

}