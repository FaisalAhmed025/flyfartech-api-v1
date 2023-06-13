import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Req, Res, HttpStatus } from '@nestjs/common';
import { JobapplicationService } from './jobapplication.service';
import { CreateJobapplicationDto } from './dto/create-jobapplication.dto';
import { UpdateJobapplicationDto } from './dto/update-jobapplication.dto';
import { GCSStorageService } from 'src/s3/s3.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Jobapplication } from './entities/jobapplication.entity';
import { Repository } from 'typeorm';
import { Request, Response } from 'express';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@Controller('jobapplication')
export class JobapplicationController {
  constructor(   @InjectRepository(Jobapplication) private JobapplicationRepository: Repository<Jobapplication>,
  private s3service: GCSStorageService,
  private readonly jobapplicationService: JobapplicationService) {}

  @ApiTags('jobapplication')
  @Post('add')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'cvattachmenturl', maxCount: 2 }]))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          Description: { type: 'string' },
          Name: { type: 'string' },
          Email: { type: 'string' },
          cvattachmenturl: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })
  async addtestimonial( 
    @UploadedFiles()
    file: {
      cvattachmenturl?: Express.Multer.File[]},
  @Req() req: Request,
  @Body() body,
  @Res() res: Response){
    const{Email,Name,Description} =req.body;
    let cvattachmenturl = null;
    if (file.cvattachmenturl && file.cvattachmenturl.length > 0) {
      cvattachmenturl = await this.s3service.Addimage(file.cvattachmenturl[0]);
    }

    const application  = new Jobapplication()
    application.cvattachmenturl =cvattachmenturl
    application.Email =Email
    application.Name = Name
    application.Description=Description
    await this.JobapplicationRepository.save({...application})
    return res.status(HttpStatus.OK).send({ status: "success", message: "Application Successfull", })
  }


  @ApiTags('jobapplication')
  @Get('all')
  async alltestimonial( @Res() res: Response){
    const applyjob = await this.JobapplicationRepository.find({order:{created_at:'ASC'}})
    if (!applyjob) {
      return res.status(HttpStatus.NOT_FOUND).send({
        status: "error",
        message: "No Application Found",
      });
    }
    return res.status(HttpStatus.OK).json({applyjob})  
  }

  @ApiTags('jobapplication')
  @Delete(':id')
 async remove( @Res() res: Response,@Param('id') id: number) {
    await this.JobapplicationRepository.delete(id)
    return res.status(HttpStatus.OK).send({status:"success", messsage:"Application has Deleted"})

  }
}
