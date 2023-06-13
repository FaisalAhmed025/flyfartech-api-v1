import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Req, Res, HttpStatus } from '@nestjs/common';
import { ServiceService } from './service.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { GCSStorageService } from 'src/s3/s3.service';
import { Services } from './entities/services.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';


@ApiTags('Service')
@Controller('service')
export class ServiceController {
  constructor( 
    private s3service: GCSStorageService,
    @InjectRepository(Services) private ServicesRepository: Repository<Services>,
    private readonly serviceService: ServiceService) {}

    
    @Post('add')
    @UseInterceptors(FileFieldsInterceptor([
      { name: 'imageurl', maxCount: 2 }]))
      @ApiConsumes('multipart/form-data')
      @ApiBody({
        schema: {
          type: 'object',
          properties: { 
            Name: { type: 'string' },
            TextField: { type: 'string' },
            CustomerCount: { type: 'number' },
            Category: { type: 'string' },
            imageurl: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      })
    async Addservices( 
      @UploadedFiles()
      file: {
        imageurl?: Express.Multer.File[]},
    @Req() req: Request,
    @Body() body,
    @Res() res: Response){
      const{TextField, Name ,CustomerCount} =req.body;
      let imageurl = null;
      if (file.imageurl && file.imageurl.length > 0) {
        imageurl = await this.s3service.Addimage(file.imageurl[0]);
      }
      const services  = new Services()
      services.imageurl =imageurl
      services.Name =Name
      services.TextField =TextField
      services.CustomerCount =CustomerCount
      await this.ServicesRepository.save({...services})
      return res.status(HttpStatus.OK).send({ status: "success", message: "Services Added Successfully", })
    }


    
    @Patch(':id')
    @UseInterceptors(FileFieldsInterceptor([
      { name: 'imageurl', maxCount: 2 }]))
      @ApiConsumes('multipart/form-data')
      @ApiBody({
        schema: {
          type: 'object',
          properties: { 
            Name: { type: 'string' },
            TextField: { type: 'string' },
            CustomerCount: { type: 'number' },
            Category: { type: 'string' },
            imageurl: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      })
    async updateservices( 
      @UploadedFiles()
      file: {
        imageurl?: Express.Multer.File[]},
    @Req() req: Request,
    @Param('id') id:number,
    @Body() body,
    @Res() res: Response){
      const{TextField, Name ,CustomerCount} =req.body;
      let imageurl = null;
      if (file.imageurl && file.imageurl.length > 0) {
        imageurl = await this.s3service.Addimage(file.imageurl[0]);
      }

      const services = await this.ServicesRepository.findOne({where:{id}}); // Retrieve testimonial by ID instead of UUID

      if (!services) {
        return res.status(HttpStatus.NOT_FOUND).send({
          status: "error",
          message: "service not found",
        });
      }
      services.imageurl =imageurl
      services.Name =Name
      services.TextField =TextField
      services.CustomerCount =CustomerCount
      await this.ServicesRepository.update({id},{...services})
      return res.status(HttpStatus.OK).send({ status: "success", message: "Service update Successfully", })
    }


    @Get('all')
    async allservices( @Res() res: Response){
      const allservices = await this.ServicesRepository.find({order:{created_at:'ASC'}})
      return res.status(HttpStatus.OK).send({allservices})
    }


    @Delete(':id')
    async Deleteservice(
       @Param('id') id: string,
       @Req() req: Request,
       @Res() res: Response) {
       await this.ServicesRepository.delete(id)
       return res.status(HttpStatus.OK).json({ message: 'service has deleted' });
    }


}
