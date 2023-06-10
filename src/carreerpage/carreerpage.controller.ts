import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Req, Res, HttpStatus } from '@nestjs/common';
import { CarreerpageService } from './carreerpage.service';
import { GCSStorageService } from 'src/s3/s3.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Carreerpage } from './entities/carreerpage.entity';
import { Repository } from 'typeorm';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';



@ApiTags('Carreerpage')
@Controller('carreerpage')
export class CarreerpageController {
  constructor(@InjectRepository(Carreerpage) private CarreerpageRepository: Repository<Carreerpage>,
   private s3service: GCSStorageService,
   private readonly carreerpageService: CarreerpageService) {}


   @Post('add')
   @UseInterceptors(FileFieldsInterceptor([
     { name: 'imageurl1', maxCount: 2 },
     { name: 'imageurl2', maxCount: 2 }
    ]))
     @ApiConsumes('multipart/form-data')
     @ApiBody({
       schema: {
         type: 'object',
         properties: { 

           imageurl1: {
             type: 'string',
             format: 'binary',
           },
           imageurl2: {
            type: 'string',
            format: 'binary',
          },
         },
       },
     })
   async uplodadcovervideo( 
     @UploadedFiles()
     file: {
       imageurl1?: Express.Multer.File[],
       imageurl2?: Express.Multer.File[]
      },
   @Req() req: Request,
   @Body() body,
   @Res() res: Response){
 
     const{Designation,FullName} =req.body;
       let imageurl1 = null;
     if (file.imageurl1 && file.imageurl1.length > 0) {
      imageurl1 = await this.s3service.Addimage(file.imageurl1[0]);
     }
     let imageurl2 = null;
     if (file.imageurl2 && file.imageurl2.length > 0) {
      imageurl2 = await this.s3service.Addimage(file.imageurl2[0]);
     }
     const image  = new Carreerpage()
     image.coverimage1 =imageurl1
     image.coverimage2 =imageurl2
     await this.CarreerpageRepository.save({...image})
     return res.status(HttpStatus.OK).send({ status: "success", message: "Employee Added Successfully", })
   }



   @Patch(':id')
   @UseInterceptors(FileFieldsInterceptor([
     { name: 'imageurl1', maxCount: 2 },
     { name: 'imageurl2', maxCount: 2 }
    ]))
     @ApiConsumes('multipart/form-data')
     @ApiBody({
       schema: {
         type: 'object',
         properties: { 

           imageurl1: {
             type: 'string',
             format: 'binary',
           },
           imageurl2: {
            type: 'string',
            format: 'binary',
          },
         },
       },
     })
   async updatecovervideo( 
     @UploadedFiles()
     file: {
       imageurl1?: Express.Multer.File[],
       imageurl2?: Express.Multer.File[]
      },

   @Param('id') id:string,
   @Req() req: Request,
   @Body() body,
   @Res() res: Response){
 
       let imageurl1 = null;
     if (file.imageurl1 && file.imageurl1.length > 0) {
      imageurl1 = await this.s3service.Addimage(file.imageurl1[0]);
     }
     let imageurl2 = null;
     if (file.imageurl2 && file.imageurl2.length > 0) {
      imageurl2 = await this.s3service.Addimage(file.imageurl2[0]);
     }

     const image = await this.CarreerpageRepository.findOne({where:{id}})
     if (!image) {
      return res.status(HttpStatus.NOT_FOUND).send({
        status: "error",
        message: "image not found",
      });
    }
     image.coverimage1 =imageurl1
     image.coverimage2 =imageurl2
     await this.CarreerpageRepository.update({id},{...image})
     return res.status(HttpStatus.OK).send({ status: "success", message: "Employee update Successfull", })
   }


  @Get('all')
  async allemployee( @Res() res: Response){
    const coverimages = await this.CarreerpageRepository.find({})
    return res.status(HttpStatus.OK).send({coverimages})
  }

  @Delete(':id')
  async deleteimage(
    @Param('id') id:string,
     @Res() res: Response){
      await this.CarreerpageRepository.delete(id)
      return res.status(HttpStatus.OK).send({ status: "success", message: "image has deleted ", })
   }
   
    


}
