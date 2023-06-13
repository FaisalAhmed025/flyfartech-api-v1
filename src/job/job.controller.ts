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
  @ApiConsumes('multipart/form-data')
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
  @Req() req: Request,
  @Body() body,
  @Res() res: Response){
    const{Title,Description,DueDate} =req.body;
    const newjob  = new Job()
    newjob.Title =Title
    newjob.Description =Description
    newjob.DueDate =DueDate
    await this.Jobrepository.save({...newjob})
    return res.status(HttpStatus.OK).send({ status: "success", message: "Job Created succesfully", })
  }


  

  @Patch(':jobid')
  @ApiConsumes('multipart/form-data')
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
  async UpdateeJob( 
  @Param('jobid') jobid:string,
  @Req() req: Request,
  @Body() body,
  @Res() res: Response){
    const{Title,Description,DueDate} =req.body;
    const job = await this.Jobrepository.findOne({where:{jobid}}); // Retrieve testimonial by ID instead of UUID
    if (!job) {
      return res.status(HttpStatus.NOT_FOUND).send({
        status: "error",
        message: "job not found",
      });
    }
    job.Title =Title
    job.Description =Description
    job.DueDate =DueDate
    await this.Jobrepository.update({jobid},{...job})
    return res.status(HttpStatus.OK).send({ status: "success", message: "Job updated succesfully", })
  }


  @Get('all')
  async allJob( @Res() res: Response){
    const jobs = await this.Jobrepository.find({})
    if (!jobs) {
      return res.status(HttpStatus.NOT_FOUND).send({
        status: "error",
        message: "jobs not found",
      });
    }
    return res.status(HttpStatus.OK).json({jobs})  
  }


  
  @Delete(':jobid')
  async DeleteJob(
     @Param('jobid') jobid: string,
     @Req() req: Request,
     @Res() res: Response) {
     await this.Jobrepository.delete(jobid)
     return res.status(HttpStatus.OK).send({ status:"success", message: 'job has deleted' });
  }

}
