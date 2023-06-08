import { Module } from '@nestjs/common';
import { ServiceService } from './service.service';
import { ServiceController } from './service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Services } from './entities/services.entity';
import { S3Module } from 'src/s3/s3.module';

@Module({
  imports:[TypeOrmModule.forFeature([Services]),S3Module],
  controllers: [ServiceController],
  providers: [ServiceService]
})
export class ServiceModule {}
