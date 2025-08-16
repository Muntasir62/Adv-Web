import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Res, SetMetadata, UploadedFile, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
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
import { AuthService } from "./auth.service";
import { AdminAccessGuard } from "./admin-access.guard";
import { AuthGuard } from '@nestjs/passport';




@Controller('admin')
export class AdminController
 {
  constructor(private readonly adminService: AdminService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  signUp(): string
  {
    return this.adminService.signUp();
  }

  
  @Post('signin')
  @UsePipes(new ValidationPipe())
  async signIn(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }

  @Get('query')
  getId(@Query('name') name : string): string
  {
    return this.adminService.getId(name);
  }
   @Post('create')
  @UseGuards(AuthGuard('jwt'), AdminAccessGuard)
  @SetMetadata('accessLevel', 'super_admin')
  @UsePipes(new ValidationPipe())
  createAdminSuper(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.createAdmin(createAdminDto);
  }
  
  @Post('/addadmin')
  @UsePipes(new ValidationPipe())
  addAdmin(@Body() data : CreateAdminDto)
  {
    console.log(data);
    return this.adminService.createAdmin(data);
  }
   @Post('users')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  createUser(@Body() createDto: CreateUserDto)
  {
    console.log(createDto);
    return this.adminService.createUser(createDto);
  }
  @Get('users')
 @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
  suspendUser(@Param('id', ParseIntPipe) id: number)
  {
    return this.adminService.suspendUser(id);
  }
  @Delete('users/:id/delete')
 @UseGuards(AuthGuard('jwt'))
  deleteUser(@Param('id', ParseIntPipe) id: number)
  {
    return this.adminService.deleteUser(id);
  }
    
  @Post('courses/:adminId')
  @UseGuards(AuthGuard('jwt'))
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
 @UseGuards(AuthGuard('jwt'))
  getCourse(@Param('adminId', ParseIntPipe) adminId: number)
  {
    return this.adminService.getCourses(adminId);
  }
   @Post('courses/:id/approve')
  approveCourse(@Param('id', ParseIntPipe) id: number): string
  {
    return this.adminService.approveCourse(id);
  }
   @Patch(':adminId/courses/:courseId/reject')
   @UseGuards(AuthGuard('jwt'))
  rejectCourse(  @Param('adminId', ParseIntPipe) adminId: number,
    @Param('courseId', ParseIntPipe) courseId: number,
    @Body() rejectCourseDto: RejectCourseDto
  ) {
    return this.adminService.rejectCourse(adminId, courseId, rejectCourseDto.reason);
  
  }
  @Delete('courses/:id')
  @UseGuards(AuthGuard('jwt'), AdminAccessGuard)
  @SetMetadata('accessLevel', 'super_admin')
  @UsePipes(new ValidationPipe())
  deleteCourse(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteCourse(id);
  }
  @Post('reports')
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  createReport(@Body() createDto: CreateReportDto)
  {
    console.log(createDto);
    return this.adminService.createReport(createDto);
  }
  @Get('reports')
 @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  createReview(@Body() createDto: CreateReviewDto)
  {
    console.log(createDto);
    return this.adminService.createReview(createDto);
  }
   @Get('reviews')
  @UseGuards(AuthGuard('jwt'))
  getReviews() : object
  {
    return this.adminService.getReviews();
  }
   @Delete('reviews/:id/delete')
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe())
  createNotification(@Body() createDto: CreateNotificationDto)
  {
    console.log(createDto);
    return this.adminService.createNotification(createDto);
  }
   @Get('notifications')
  @UseGuards(AuthGuard('jwt'))
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