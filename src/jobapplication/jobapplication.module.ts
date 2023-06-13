import { Module } from '@nestjs/common';
import { JobapplicationService } from './jobapplication.service';
import { JobapplicationController } from './jobapplication.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Jobapplication } from './entities/jobapplication.entity';
import { S3Module } from 'src/s3/s3.module';

@Module({
  imports:[TypeOrmModule.forFeature([Jobapplication]),S3Module],
  controllers: [JobapplicationController],
  providers: [JobapplicationService]
})
export class JobapplicationModule {}
