import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Req, Res, HttpStatus } from '@nestjs/common';
import { TestimonialService } from './testimonial.service';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Testimonial } from './entities/testimonial.entity';
import { Repository } from 'typeorm';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { GCSStorageService } from 'src/s3/s3.service';


@ApiTags('Testimonial')
@Controller('testimonial')
export class TestimonialController {
  constructor( 
    @InjectRepository(Testimonial) private TestimonialRepository: Repository<Testimonial>,
    private s3service: GCSStorageService,
     private readonly testimonialService: TestimonialService) {}
  
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
          Review: { type: 'number' },
          Description: { type: 'string' },
          imageurl: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })
  async addtestimonial( 
    @UploadedFiles()
    file: {
      imageurl?: Express.Multer.File[]},
  @Req() req: Request,
  @Body() body,
  @Res() res: Response){
    const{Designation,FullName,Review,Description} =req.body;

    let imageurl = null;
    if (file.imageurl && file.imageurl.length > 0) {
      imageurl = await this.s3service.Addimage(file.imageurl[0]);
    }
    
    const testimonial  = new Testimonial()
    testimonial.imageurl =imageurl
    testimonial.Review =Review
    testimonial.FullName = FullName
    testimonial.Designation =Designation
    testimonial.Description=Description
    await this.TestimonialRepository.save({...testimonial})
    return res.status(HttpStatus.OK).send({ status: "success", message: "testimonial Added Successfully", })
  }

  @Patch(':id')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'imageurl', maxCount: 2 }]))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      schema: {
        type: 'object',
        properties: { 
          Designation: { type: 'string' },
          FullName: { type: 'string' },
          Review: { type: 'string' },
          Description: { type: 'string' },
          imageurl: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })
  async Updatetestimonial(
    @UploadedFiles()
    file: {
      imageurl?: Express.Multer.File[]},
    
    @Param('id') id: string,
    @Req() req: Request,
    @Body() body,
    @Res() res: Response){
    const{Designation,FullName,Review,Description} =req.body;
    let imageurl = null;
    if (file.imageurl && file.imageurl.length > 0) {
      imageurl = await this.s3service.Addimage(file.imageurl[0]);
    }

    const testimonial = await this.TestimonialRepository.findOne({where:{id}}); // Retrieve testimonial by ID instead of UUID

    if (!testimonial) {
      return res.status(HttpStatus.NOT_FOUND).send({
        status: "error",
        message: "Testimonial not found",
      });
    }
    
    testimonial.imageurl =imageurl
    testimonial.Review =Review
    testimonial.FullName = FullName
    testimonial.Designation =Designation
    testimonial.Description=Description
    await this.TestimonialRepository.update({id},{...testimonial})
    return res.status(HttpStatus.OK).send({ status: "success", message: "testimonial update Successfully", })
  }



  @Get('all')
  async alltestimonial( @Res() res: Response){
    const alltestimonial = await this.TestimonialRepository.find({})
    if (!alltestimonial) {
      return res.status(HttpStatus.NOT_FOUND).send({
        status: "error",
        message: "Testimonial not found",
      });
    }
    return res.status(HttpStatus.OK).json({alltestimonial})  
  }


  @Delete(':id')
  async Deletetestimonial(
     @Param('id') id: string,
     @Req() req: Request,
     @Res() res: Response) {
     await this.TestimonialRepository.delete(id)
     return res.status(HttpStatus.OK).send({ status:"success", message: 'testimonial has deleted' });
  }


}
