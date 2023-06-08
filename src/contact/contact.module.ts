import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { S3Module } from 'src/s3/s3.module';

@Module({
  imports:[TypeOrmModule.forFeature([Contact]),S3Module],
  controllers: [ContactController],
  providers: [ContactService]
})
export class ContactModule {}
