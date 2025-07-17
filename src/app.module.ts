import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { adminmodule } from './admin/admin.module';


@Module({
  imports: [adminmodule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
