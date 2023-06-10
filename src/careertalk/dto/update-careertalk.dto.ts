import { PartialType } from '@nestjs/swagger';
import { CreateCareertalkDto } from './create-careertalk.dto';

export class UpdateCareertalkDto extends PartialType(CreateCareertalkDto) {}
