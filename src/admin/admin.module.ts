import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CourseEntity } from "./course.entity";
import { AdminEntity } from "./admin.entity";
import { UserEntity } from "./user.entity";
import { ReportEntity } from "./report.enity";
import { NotificationEntity } from "./notification.entity";
import { ReviewEntity } from "./review.entity";


@Module({
    imports: [TypeOrmModule.forFeature([AdminEntity,CourseEntity, UserEntity, ReportEntity, NotificationEntity, ReviewEntity   ])],
    controllers: [AdminController],
    providers: [AdminService],
})
export class AdminModule {}