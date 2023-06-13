import { Injectable } from '@nestjs/common';
import { CreateJobapplicationDto } from './dto/create-jobapplication.dto';
import { UpdateJobapplicationDto } from './dto/update-jobapplication.dto';

@Injectable()
export class JobapplicationService {
  create(createJobapplicationDto: CreateJobapplicationDto) {
    return 'This action adds a new jobapplication';
  }

  findAll() {
    return `This action returns all jobapplication`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jobapplication`;
  }

  update(id: number, updateJobapplicationDto: UpdateJobapplicationDto) {
    return `This action updates a #${id} jobapplication`;
  }

  remove(id: number) {
    return `This action removes a #${id} jobapplication`;
  }
}
