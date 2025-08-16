import { forwardRef, Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CourseEntity } from "./course.entity";
import { AdminEntity } from "./admin.entity";
import { UserEntity } from "./user.entity";
import { ReportEntity } from "./report.enity";
import { NotificationEntity } from "./notification.entity";
import { ReviewEntity } from "./review.entity";
import { AuthModule } from "./auth.module";


@Module({
    imports: [TypeOrmModule.forFeature([AdminEntity,CourseEntity, UserEntity, ReportEntity, NotificationEntity, ReviewEntity   ]), forwardRef(() => AuthModule),],
    controllers: [AdminController],
    providers: [AdminService],
    exports: [AdminService],
})
export class AdminModule {}