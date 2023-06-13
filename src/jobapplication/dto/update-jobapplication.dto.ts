import { PartialType } from '@nestjs/swagger';
import { CreateJobapplicationDto } from './create-jobapplication.dto';

export class UpdateJobapplicationDto extends PartialType(CreateJobapplicationDto) {}
