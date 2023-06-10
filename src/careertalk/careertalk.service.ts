import { Injectable } from '@nestjs/common';
import { CreateCareertalkDto } from './dto/create-careertalk.dto';
import { UpdateCareertalkDto } from './dto/update-careertalk.dto';

@Injectable()
export class CareertalkService {
  create(createCareertalkDto: CreateCareertalkDto) {
    return 'This action adds a new careertalk';
  }

  findAll() {
    return `This action returns all careertalk`;
  }

  findOne(id: number) {
    return `This action returns a #${id} careertalk`;
  }

  update(id: number, updateCareertalkDto: UpdateCareertalkDto) {
    return `This action updates a #${id} careertalk`;
  }

  remove(id: number) {
    return `This action removes a #${id} careertalk`;
  }
}
