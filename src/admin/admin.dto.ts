import { IsEmail, IsString, IsInt, IsOptional, IsNumber, Min, Matches, Length, IsIn, minLength, min, isInt, MinLength, IsNotEmpty, IsEnum } from 'class-validator';

export class CreateAdminDto {
  
   @Matches(/^[a-zA-Z]+$/, { message: 'Name must contain only alphabets' })
  @MinLength(3)
  name: string;

  @IsEmail()
  email: string;

  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/, { message: ' Invalid Password' })
  password: string;

  @IsString()
   @IsEnum(['super_admin', 'moderator', 'analyst'], {
        message: 'Access level must be one of: super_admin, moderator, analyst'
    })
  accessLevel: 'super_admin' | 'moderator' | 'analyst';
}

export class CreateUserDto {
   @Matches(/^[a-zA-Z]+$/, { message: 'Name must contain only alphabets' })
  name: string;

  @IsEmail()
  email: string;

  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$/, { message: ' Invalid Password' })
  password: string;

   @IsNotEmpty()
  @IsEnum(['learner', 'instructor']) 
  role: 'learner' | 'instructor';
}

export class CreateCourseDto {
  @IsString()
  @MinLength(5)
  title: string;

  @IsString()
  @MinLength(10)
  description: string;

  @Matches(/^0[0-9]*$/, { message: 'instructorId must be an integer starting with 0' })
  instructorId: string;
  @IsOptional()
  @IsInt()
  adminId? : number;
}
export class RejectCourseDto {
  @IsOptional()
  @IsString()
  reason?: string;
}
export class CreateReportDto {
  @IsInt()
  reportedUserId: number;

  @IsInt()
  @IsOptional()
  reportedCourseId?: number;

  @IsString()
  description: string;
}

export class CreateNotificationDto {
  @IsString()
  title: string;

  @IsString()
  message: string;

  @IsString()
  recipient: string;
}

export class UpdateSettingDto {
  @IsString()
  key: string;

  @IsString()
  value: string;
}

export class CreateReviewDto {
  @IsInt()
  courseId: number;

  @IsInt()
  userId: number;

  @IsNumber()
  @Min(1)
  rating: number;

  @IsString()
  comment: string;
}
// New
/*
export class CreateAdminDto
{
  @IsString()
  @Length(1, 100)
  fullname : string;
  @IsInt()
  @Min(0)
  age : number;

}
export class UpdateAdminStatusDto
{
  @IsString()
  @IsIn(['active', 'inactive'])
  status : 'active' | 'inactive';
}
  */
