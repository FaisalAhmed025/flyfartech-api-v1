import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Req, Res, HttpStatus } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { Repository } from 'typeorm';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';


@ApiTags('Job')
@Controller('job')
export class JobController {
  constructor(
    @InjectRepository(Job) private Jobrepository:Repository<Job>,
    private readonly jobService: JobService) {}

  @Post('add')
    @ApiBody({
      schema: {
        type: 'object',
        properties: { 
          Title: { type: 'string' },
          Description: { type: 'string' },
          DueDate: { type: 'date' },
        },
      },
    })
  async addeJob( 
    @UploadedFiles()
  @Req() req: Request,
  @Body() body,
  @Res() res: Response){

    const{Title,Description,DueDate} =req.body;
    const newjob  = new Job()
    newjob.Title =Title
    newjob.Description =Description
    newjob.DueDate =DueDate
    await this.Jobrepository.save({...newjob})
    return res.status(HttpStatus.OK).send({ status: "success", message: "Job Created succesfully Successfully", })
  }
}
