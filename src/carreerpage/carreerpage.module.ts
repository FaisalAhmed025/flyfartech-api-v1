import { Module } from '@nestjs/common';
import { CarreerpageService } from './carreerpage.service';
import { CarreerpageController } from './carreerpage.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carreerpage } from './entities/carreerpage.entity';
import { S3Module } from 'src/s3/s3.module';

@Module({
  imports:[  TypeOrmModule.forFeature([Carreerpage]), S3Module],
  controllers: [CarreerpageController],
  providers: [CarreerpageService]
})
export class CarreerpageModule {}
