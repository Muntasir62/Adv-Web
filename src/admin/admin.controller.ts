import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Query, Res, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { AdminService } from "./admin.service";
import {
  CreateAdminDto,
  CreateUserDto,
  CreateCourseDto,
  CreateReportDto,
  CreateNotificationDto,
  UpdateSettingDto,
  CreateReviewDto,
  RejectCourseDto,
 // CreateAdminDto,
 // UpdateAdminStatusDto,
 // CreateUserDto,
} from "./admin.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage, MulterError } from "multer";
import { CourseEntity } from "./course.entity";


@Controller('admin')
export class AdminController
 {
  constructor(private readonly adminService: AdminService) {}

  @Post('signup')
  signUp(): string
  {
    return this.adminService.signUp();
  }

  @Post('signin')
  signIn(): string
  {
    return this.adminService.signIn();
  }
  @Get('query')
  getId(@Query('name') name : string): string
  {
    return this.adminService.getId(name);
  }
  @Post()
   @UsePipes(new ValidationPipe())
  createAdmin(@Body() createAdminDto : CreateAdminDto)
  {
    return this.adminService.createAdmin(createAdminDto);
  }
  
  @Post('/addadmin')
  @UsePipes(new ValidationPipe())
  addAdmin(@Body() data : CreateAdminDto): string
  {
    console.log(data);
    return this.adminService.addAdmin(data);
  }
   @Post('users')
  @UsePipes(new ValidationPipe())
  createUser(@Body() createDto: CreateUserDto)
  {
    console.log(createDto);
    return this.adminService.createUser(createDto);
  }
  @Get('users')
  getUsers() : object
  {
  return this.adminService.getUsers();
  }
  @Get('users/:id')
  getUser(@Param('id', ParseIntPipe) id: number)
  {
    return this.adminService.getUser(id);
  }
   @Post('users/:id/verify')
  verifyUser(@Param('id', ParseIntPipe) id: number): string
  {
    return this.adminService.verifyUser(id);
  }
  @Patch('users/:id/suspend')
  suspendUser(@Param('id', ParseIntPipe) id: number)
  {
    return this.adminService.suspendUser(id);
  }
  @Post('users/:id/delete')
  deleteUser(@Param('id', ParseIntPipe) id: number)
  {
    return this.adminService.deleteUser(id);
  }
    
  @Post('courses/:adminId')
  @UsePipes(new ValidationPipe())
  createCourse(@Param ('adminId', ParseIntPipe) adminId : number, @Body() CreateCourseDto : CreateCourseDto)
  {
   const course = new CourseEntity();
   course.title = CreateCourseDto.title;
   course.description = CreateCourseDto.description;
    course.createdAt = new Date(); 
    course.status = 'approved'; 
   return this.adminService.createCourse(adminId, course);
  }
   
  
  @Get('courses/:adminId')
  getCourse(@Param('adminId', ParseIntPipe) adminId: number)
  {
    return this.adminService.getCourse(adminId);
  }
   @Post('courses/:id/approve')
  approveCourse(@Param('id', ParseIntPipe) id: number): string
  {
    return this.adminService.approveCourse(id);
  }
   @Patch(':adminId/courses/:courseId/reject')
  rejectCourse(  @Param('adminId', ParseIntPipe) adminId: number,
    @Param('courseId', ParseIntPipe) courseId: number,
    @Body() rejectCourseDto: RejectCourseDto
  ) {
    return this.adminService.rejectCourse(adminId, courseId, rejectCourseDto.reason);
  
  }
  @Post('reports')
  @UsePipes(new ValidationPipe())
  createReport(@Body() createDto: CreateReportDto)
  {
    console.log(createDto);
    return this.adminService.createReport(createDto);
  }
  @Get('reports')
  getReports() : object
  {
    return this.adminService.getReports();
  }
   @Post('reports/:id/resolve')
  resolveReport(@Param('id', ParseIntPipe) id: number): string
  {
    return this.adminService.resolveReport(id);
  }
  @Patch('reports/:id/dismiss')
  dismissReport(@Param('id', ParseIntPipe) id: number)
  {
    return this.adminService.dismissReport(id);
  }
  @Get('analytics/user-growth')
  getUserGrowth() : object
  {
    return this.adminService.getUserGrowth();
  }
    @Get('analytics/course-engagement')
  getCourseEngagement() : object
  {
    return this.adminService.getCourseEngagement();
  }
  @Post('backup/create')
  createBackup(): string
  {
    return this.adminService.createBackup();
  }
  @Post('backup/restore/:backupId')
  restoreBackup(@Param('backupId') backupId: string): string
  {
    return this.adminService.restoreBackup(backupId);
  }
  @Post('settings')
  @UsePipes(new ValidationPipe())
  updateSetting(@Body() updateDto: UpdateSettingDto): string
  {
    console.log(updateDto);
    return this.adminService.updateSetting(updateDto);
  }
   @Get('settings/:key')
  getSetting(@Param('key') key: string): string
  {
    return this.adminService.getSetting(key);
  }
  @Post('reviews')
  @UsePipes(new ValidationPipe())
  createReview(@Body() createDto: CreateReviewDto)
  {
    console.log(createDto);
    return this.adminService.createReview(createDto);
  }
   @Get('reviews')
  getReviews() : object
  {
    return this.adminService.getReviews();
  }
   @Post('reviews/:id/delete')
  deleteReview(@Param('id', ParseIntPipe) id: number)
  {
    return this.adminService.deleteReview(id);
  }
  @Get('logs')
  getLogs() : object
  {
    return this.adminService.getLogs();
  }
  @Post('notifications')
  @UsePipes(new ValidationPipe())
  createNotification(@Body() createDto: CreateNotificationDto)
  {
    console.log(createDto);
    return this.adminService.createNotification(createDto);
  }
   @Get('notifications')
  getNotifications() : object
  {
    return this.adminService.getNotifications();
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
  if (file.originalname.match(/^.*\.(|pdf|jpg|webp|png|jpeg)$/))
  cb(null, true);
  else {
  cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'file'), false);
}
},
  limits: { fileSize: 3000000 },
  storage:diskStorage({
  destination: './uploads',
  filename: function (req, file, cb) {
  cb(null,Date.now()+file.originalname)
},
})
}))
uploadFile(@UploadedFile() file: Express.Multer.File ,@Body() userData: object ) :void {
console.log(file);
console.log(file.size);
console.log(userData);
console.log(file.destination)
}
@Get('/getimage/:name')
getImages(@Param('name') name, @Res() res) {
res.sendFile(name,{ root: './uploads' })
}
@Get(':id')
  getAdmin(@Param('id', ParseIntPipe) adminId : number)
  {
    return this.adminService.getAdmin(adminId);
  }
    

  // New
  /*
   @Post('newadmin')
   @UsePipes(new ValidationPipe())
   createAdmin(@Body() createAdminDto : CreateAdminDto): Promise<NewAdmin>
   {
    return this.adminService.createAdmin(createAdminDto);

   }
   @Patch(':id/status')
   @UsePipes(new ValidationPipe())
   updateStatus(@Param('id', ParseIntPipe)id : number, @Body() updateAdminStatusDto : UpdateAdminStatusDto) : Promise<NewAdmin>
   {
    return this.adminService.updateStatus(id, updateAdminStatusDto);
   }
   @Get('inactive')
   getInactiveAdmins(): Promise <NewAdmin[]>
   {
    return this.adminService.getInactiveAdmins();
   }
   @Get('older')
   getOlderAdmins(): Promise<NewAdmin[]>
   {
    return this.adminService.getOlderAdmins();
   }
    */



}