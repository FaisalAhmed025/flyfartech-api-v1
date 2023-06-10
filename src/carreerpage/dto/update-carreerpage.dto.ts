import { PartialType } from '@nestjs/swagger';
import { CreateCarreerpageDto } from './create-carreerpage.dto';

export class UpdateCarreerpageDto extends PartialType(CreateCarreerpageDto) {}
