import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import {   CreateAdminDto, CreateCourseDto, CreateNotificationDto, CreateReportDto, CreateReviewDto,  CreateUserDto,  UpdateSettingDto } from "./admin.dto";
import { InjectRepository } from "@nestjs/typeorm";
import {  MoreThan, Repository } from "typeorm";
import { AdminEntity } from "./admin.entity";
import { CourseEntity } from "./course.entity";
import { UserEntity } from "./user.entity";
import { ReportEntity } from "./report.enity";
import { NotificationEntity } from "./notification.entity";
import { ReviewEntity } from "./review.entity";
import * as bcrypt from 'bcrypt';



@Injectable()
export class AdminService
{
  constructor(@InjectRepository(AdminEntity) private adminRepository : Repository<AdminEntity>,
   @InjectRepository(CourseEntity) private courseRepository: Repository<CourseEntity>,   @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>, 
    @InjectRepository(ReportEntity) private reportRepository: Repository<ReportEntity>, 
    @InjectRepository(NotificationEntity) private notificationRepository: Repository<NotificationEntity>, 
    @InjectRepository(ReviewEntity) private reviewRepository: Repository<ReviewEntity>,
  ) {}
    private readonly validAccessLevels = ['super_admin', 'moderator', 'analyst'];
    private readonly validUserRoles = ['learner', 'instructor'];
    private readonly validCourseStatus = ['pending', 'approved', 'rejected'];
    private readonly validReportStatus = ['pending', 'resolved', 'dismissed'];
    async findAdminByEmail(email : string): Promise<AdminEntity | null>
    {
      return this.adminRepository.findOne({where : {email} });
    }
    signIn(): string
    {
        return 'Sign in';
    }
    signUp(): string
    {
        return 'Sign up';
    }
    getId(name : string): string
    {
        return `The given name is ${name}`;
    }
   async createAdmin (createAdminDto : CreateAdminDto): Promise <AdminEntity>
    {
      const salt = await bcrypt.genSalt();
      createAdminDto.password = await bcrypt.hash(createAdminDto.password, salt);
      const admin = this.adminRepository.create(createAdminDto);
      return this.adminRepository.save(admin);
      
        

    }
    getAdmin(adminId: number): string
    {
        return 'Admin id is '+ adminId;

    }
    addAdmin(data : CreateAdminDto): string
    {
        console.log('Name :', data.name);
        console.log('Email :', data.email);
         if (!this.validAccessLevels.includes(data.accessLevel))
        {
            throw new BadRequestException (`Invalid access levels`);

        }
         const {name, email} = data;
        return ` Admin added  ${name} with ${email}`;

    }
    async createUser (dto : CreateUserDto): Promise<UserEntity>
    {
        const salt = await bcrypt.genSalt();
    dto.password = await bcrypt.hash(dto.password, salt);
       const newUser = this.userRepository.create(dto);
    return this.userRepository.save(newUser);
        

    }
    async getUsers(): Promise<UserEntity[]>
    {
        return this.userRepository.find();

    }
     getUser(id: number): object
  {
    return { id, name: `User ${id}`, email: `user${id}@domain.com`, role: 'learner', isActive: true, isVerified: false };
  }
  verifyUser(id : number): string
  {
     return `User with id ${id} verified`;
  }
  async suspendUser(userId : number):  Promise<UserEntity>
  {
    const user = await this.userRepository.findOne({where: {id : userId}});
    if(!user)
    {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
    user.isActive = false;
    return this.userRepository.save(user);
  }
  async deleteUser(userId: number): Promise<void> 
  {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found.`);
    }
    await this.userRepository.remove(user);
  }
    
  async createCourse (adminId : number, course : CourseEntity): Promise<CourseEntity> 
  {
    const admin = await this.adminRepository.findOneBy({id : adminId});
    if(!admin)
    {
      throw new NotFoundException('Admin not found');

    }
    course.approvedBy = admin;
      course.createdAt = new Date(); 
       course.status = 'approved';
    
    return this.courseRepository.save(course);
  }
  async getCourses(adminId : number): Promise<CourseEntity[]>
  {
   return this.courseRepository.find(
   {
    where : {approvedBy: {id : adminId}},
    relations : ['approvedBy'],

   }
  );
  }
 
  approveCourse(id : number): string
  {
    if (!this.validCourseStatus.includes('approved')) {
      throw new BadRequestException('Invalid status');
    }
    return `Course with id ${id} approved`;
  }
 async rejectCourse(adminId : number, courseId : number, reason?: string):  Promise<CourseEntity>
  {
    const admin = await this.adminRepository.findOneBy({ id: adminId });
    if (!admin) 
      {
      throw new NotFoundException(`Admin with ID ${adminId} not found`);
    }
     const course = await this.courseRepository.findOneBy({ id: courseId });
    if (!course) 
      {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }
    if(course.status === 'rejected')
    {
      throw new BadRequestException(`Course ${courseId} is already rejected`);
    }
    course.status = 'rejected';
    course.approvedBy = admin;
    course.rejectionReason = reason;
    return this.courseRepository.save(course);
  }
   async deleteCourse(id: number): Promise<void> {
    const course = await this.courseRepository.findOne({ where: { id } });
    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found.`);
    }
    await this.courseRepository.remove(course);
  }
  async createReport(dto : CreateReportDto): Promise<ReportEntity>
  {
     const newReport = this.reportRepository.create(dto);
    return this.reportRepository.save(newReport);

  }
  getReports(): Promise<ReportEntity[]> 
  {
    return this.reportRepository.find();
  }
  resolveReport(id: number): string
  {
    if (!this.validReportStatus.includes('resolved')) {
      throw new BadRequestException('Invalid status');
    }
    return `Report ${id} resolved`;
  }
 async dismissReport(reportId: number): Promise<ReportEntity> 
 {
    const report = await this.reportRepository.findOne({ where: { id: reportId } });
    if (!report) {
      throw new NotFoundException(`Report with ID ${reportId} not found.`);
    }
    report.status = 'dismissed';
    return this.reportRepository.save(report);
  }
  getUserGrowth(): object
  {
    return {totalUsers : 100};
  }
  getCourseEngagement(): object
  {
    return {totalCourses : 50, approvedCourses : 30};
  }
  createBackup(): string
  {
    return 'Backup created successfully';
  }
  restoreBackup(backupId : string): string
  {
    return `Backup ${backupId} restored successfully`;
  }
  updateSetting(dto: UpdateSettingDto): string
  {
    console.log('Key :', dto.key);
    const {key, value} = dto;
    return `Setting ${key} updated to ${value}`;
  }
  getSetting(key: string): string
  {
    return `Mock value for setting ${key}`;
  }
 async createReview(dto: CreateReviewDto): Promise<ReviewEntity>
  {
    const newReview = this.reviewRepository.create(dto);
    newReview.createdAt = new Date();
    return this.reviewRepository.save(newReview);
  }
   async getReviews(): Promise<ReviewEntity[]> {
    return this.reviewRepository.find();
  }
  
    async deleteReview(reviewId: number): Promise<void> 
    {
    const review = await this.reviewRepository.findOne({ where: { id: reviewId } });
    if (!review) {
      throw new NotFoundException(`Review with ID ${reviewId} not found.`);
    }
    await this.reviewRepository.remove(review);
  }
   getLogs(): object
  {
    return [{ id: 1, action: 'Mock action', timestamp: Date() }];
  }
  async createNotification(dto: CreateNotificationDto): Promise<NotificationEntity>
  {
     const newNotification = this.notificationRepository.create(dto);
     newNotification.timestamp = new Date();
    return this.notificationRepository.save(newNotification);
  }
  async getNotifications(): Promise<NotificationEntity[]>
  {
    return this.notificationRepository.find();
  }
  // New
  /*
  async createAdmin(createAdminDto : CreateAdminDto) : Promise<NewAdmin>
  {
    const newAdmin = this.adminRepository.create(createAdminDto);
    return this.adminRepository.save(newAdmin);
  }
  async updateStatus(id : number, updateAdminStatusDto : UpdateAdminStatusDto): Promise<NewAdmin>
  {
    const admin = await this.adminRepository.findOneBy({id});
    if (!admin)
    {
      throw new NotFoundException(`Admin id ${id} not found`);
    }
    await this.adminRepository.update(id, updateAdminStatusDto);
    return this.adminRepository.findOneBy({id}) as Promise<NewAdmin>;


  }
  async getInactiveAdmins(): Promise<NewAdmin[]>
  {
    return this.adminRepository.find({ where: {status: 'inactive'},});
  }

async getOlderAdmins(): Promise<NewAdmin[]>
{
  return this.adminRepository.find({where : {age : MoreThan(25)},});
}
  */
}