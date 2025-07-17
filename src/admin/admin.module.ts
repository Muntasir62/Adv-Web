import { Module } from "@nestjs/common";
import { admincontroller } from "./admin.controller";
import { adminservice } from "./admin.service";
@Module({
    controllers: [admincontroller],
    providers: [adminservice],
})
export class adminmodule {}