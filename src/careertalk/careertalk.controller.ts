import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Req, Res, HttpStatus } from '@nestjs/common';
import { CareertalkService } from './careertalk.service';
import { GCSStorageService } from 'src/s3/s3.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Careertalk } from './entities/careertalk.entity';
import { Repository } from 'typeorm';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';



@ApiTags('careertalk')
@Controller('careertalk')
export class CareertalkController {
  constructor(@InjectRepository(Careertalk) private CarreertalkRepository: Repository<Careertalk>,
  private readonly careertalkService: CareertalkService, private s3service: GCSStorageService) {}

  @Post('add')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'imageurl', maxCount: 2 }]))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      schema: {
        type: 'object',
        properties: { 
          Designation: { type: 'string' },
          FullName: { type: 'string' },
          imageurl: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })
  async addemployee( 
    @UploadedFiles()
    file: {
      imageurl?: Express.Multer.File[]},
  @Req() req: Request,
  @Body() body,
  @Res() res: Response){

    const{FullName,Description,Title} =req.body;
      let imageurl = null;
    if (file.imageurl && file.imageurl.length > 0) {
      imageurl = await this.s3service.Addimage(file.imageurl[0]);
    }
    const carreer  = new Careertalk()
    carreer.imageurl =imageurl
    carreer.Title =Title       
    carreer.FullName = FullName
    carreer.Description =Description
    await this.CarreertalkRepository.save({...carreer})
    return res.status(HttpStatus.OK).send({ status: "success", message: "Message Added Successfully", })
  }

  @Get('all')
  async allblog( @Res() res: Response){
    const Allmessage = await this.CarreertalkRepository.find({order:{created_at:'ASC'}})
    return res.status(HttpStatus.OK).send({Allmessage})
  }


}
