import { Module } from '@nestjs/common';
import { CareertalkService } from './careertalk.service';
import { CareertalkController } from './careertalk.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Careertalk } from './entities/careertalk.entity';
import { S3Module } from 'src/s3/s3.module';

@Module({
  imports:[TypeOrmModule.forFeature([Careertalk]), S3Module],
  controllers: [CareertalkController],
  providers: [CareertalkService]
})
export class CareertalkModule {}
