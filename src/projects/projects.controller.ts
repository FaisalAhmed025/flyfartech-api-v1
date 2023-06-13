import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Req, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Produtcs } from './entities/product.entitt';
import { Repository } from 'typeorm';
import { Request, Response } from 'express';
import { GCSStorageService } from 'src/s3/s3.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags('Projects')
@Controller('project')
export class ProjectsController {
  constructor(
    @InjectRepository(Produtcs) private ProductRepository: Repository<Produtcs>,
    private readonly projectsService: ProjectsService,
    private s3service: GCSStorageService) {}

    @Post('add')
    @UseInterceptors(FileFieldsInterceptor([
      { name: 'imageurl', maxCount: 2 }]))
      @ApiConsumes('multipart/form-data')
      @ApiBody({
        schema: {
          type: 'object',
          properties: { 
            Country: { type: 'string' },
            Title: { type: 'string' },
            Tag: { type: 'string' },
            Description: { type: 'string' },
            Projectlink: { type: 'string' },
            imageurl: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      })
    async addproject( 
      @UploadedFiles()
      file: {
        imageurl?: Express.Multer.File[]},
    @Req() req: Request,
    @Body() body,
    @Res() res: Response){
      const{Country, Title, Tag, Projectlink, Description } =req.body;
      let imageurl = null;
      if (file.imageurl && file.imageurl.length > 0) {
        imageurl = await this.s3service.Addimage(file.imageurl[0]);
      }
      const products  = new Produtcs()
      products.imagelink =imageurl
      products.Country = Country
      products.Title =Title
      products.Description =Description
      products.Tag =Tag
      products.Projectlink =Projectlink
      await this.ProductRepository.save({...products})
      return res.status(HttpStatus.OK).send({ status: "success", message: "Project Added Successfully", })
    }

    @Patch(':id')
    @UseInterceptors(FileFieldsInterceptor([
      { name: 'imageurl', maxCount: 2 }]))
      @ApiConsumes('multipart/form-data')
      @ApiBody({
        schema: {
          type: 'object',
          properties: { 
            Country: { type: 'string' },
            Title: { type: 'string' },
            Tag: { type: 'string' },
            Description: { type: 'string' },
            Projectlink: { type: 'string' },
            imageurl: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      })
    async Updateproduct(
      @UploadedFiles()
      file: {
        imageurl?: Express.Multer.File[]},

      @Param('id') id: string,
      @Req() req: Request,
      @Body() body,
      @Res() res: Response){
      const{Projectlink,Title,Country,Description,Tag} =req.body;
      let imageurl = null;
      if (file.imageurl && file.imageurl.length > 0) {
        imageurl = await this.s3service.Addimage(file.imageurl[0]);
      }

      const product = await this.ProductRepository.findOne({where:{id}}); // Retrieve testimonial by ID instead of UUID

      if (!product) {
        return res.status(HttpStatus.NOT_FOUND).send({
          status: "error",
          message: "employee not found",
        });
      }

      product.imagelink =imageurl
      product.Country =Country
      product.Title = Title
      product.Description =Description
      product.Projectlink =Projectlink
      product.Tag =Tag
      await this.ProductRepository.update({id},{...product})
      return res.status(HttpStatus.OK).send({ status: "success", message: "Employee update Successfully", })
    }

    @Get('all')
    async Allprjoects( @Res() res: Response){
      const allprojects = await this.ProductRepository.find({})
      return res.status(HttpStatus.OK).send({allprojects})
    }


    @Delete(':id')
    async Deleteproduct(
       @Param('id') id: string,
       @Req() req: Request,
       @Res() res: Response) {
       await this.ProductRepository.delete(id)
       return res.status(HttpStatus.OK).json({ status:"success", message: 'project has deleted' });
    }


   
}

