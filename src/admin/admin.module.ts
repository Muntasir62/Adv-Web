import { Module } from "@nestjs/common";
import { admincontroller } from "./admin.controller";
import { adminservice } from "./admin.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminEntity } from "./admin.entity";
@Module({
    imports: [TypeOrmModule.forFeature([AdminEntity]),],
    controllers: [admincontroller],
    providers: [adminservice],
})
export class adminmodule {}