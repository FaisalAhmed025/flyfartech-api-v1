import { Injectable } from '@nestjs/common';
import { CreateCarreerpageDto } from './dto/create-carreerpage.dto';
import { UpdateCarreerpageDto } from './dto/update-carreerpage.dto';

@Injectable()
export class CarreerpageService {
  create(createCarreerpageDto: CreateCarreerpageDto) {
    return 'This action adds a new carreerpage';
  }

  findAll() {
    return `This action returns all carreerpage`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carreerpage`;
  }

  update(id: number, updateCarreerpageDto: UpdateCarreerpageDto) {
    return `This action updates a #${id} carreerpage`;
  }

  remove(id: number) {
    return `This action removes a #${id} carreerpage`;
  }
}
