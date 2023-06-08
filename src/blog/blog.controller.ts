import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, HttpStatus, Req, Res } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';
import { GCSStorageService } from 'src/s3/s3.service';
import { Request, Response } from 'express';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags('Blogs')
@Controller('blog')
export class BlogController {
  constructor(
    @InjectRepository(Blog) private BlogRepository: Repository<Blog>,
    private s3service: GCSStorageService,
    private readonly blogService: BlogService) {}

    @Post('create')
    @UseInterceptors(FileFieldsInterceptor([
      { name: 'imageurl', maxCount: 2 }]))
      @ApiConsumes('multipart/form-data')
      @ApiBody({
        schema: {
          type: 'object',
          properties: { 
            Designation: { type: 'string' },
            Description: { type: 'string' },
            Title: { type: 'string' },
            Category: { type: 'string' },
            imageurl: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      })
    async createblog( 
      @UploadedFiles()
      file: {
      imageurl?: Express.Multer.File[]},
      @Req() req: Request,
      @Body() body,
      @Res() res: Response){
      const{Category, Title,Designation,WrittenBy } =req.body;
      let imageurl = null;
      if (file.imageurl && file.imageurl.length > 0) {
        imageurl = await this.s3service.Addimage(file.imageurl[0]);
      }
      const blog  = new Blog()
      blog.Category =Category
      blog.imageurl = imageurl
      blog.Title =Title
      blog.Designation =Designation
      blog.WrittenBy =WrittenBy
      await this.BlogRepository.save({...blog})
      return res.status(HttpStatus.OK).send({ status: "success", message: "Blog created Successfully", })
    }
    @Patch('update/:blogid')
    @UseInterceptors(FileFieldsInterceptor([
      { name: 'imageurl', maxCount: 2 }]))
      @ApiConsumes('multipart/form-data')
      @ApiBody({
        schema: {
          type: 'object',
          properties: { 
            Designation: { type: 'string' },
            Description: { type: 'string' },
            Title: { type: 'string' },
            Category: { type: 'string' },
            imageurl: {
              type: 'string',
              format: 'binary',
            },
          },
        },
      })
    async Updateblog(
      @UploadedFiles()
      file: {
        imageurl?: Express.Multer.File[]},
      @Param('blogid') blogid: string,
      @Req() req: Request,
      @Body() body,
      @Res() res: Response){
      const{Category,Title,WrittenBy,Designation} =req.body;
      let imageurl = null;
      if (file.imageurl && file.imageurl.length > 0) {
        imageurl = await this.s3service.Addimage(file.imageurl[0]);
      }

      const blog = await this.BlogRepository.findOne({where:{blogid}}); // Retrieve testimonial by ID instead of UUID

      if (!blog) {
        return res.status(HttpStatus.NOT_FOUND).send({
          status: "error",
          message: "blog not found",
        });
      }
      blog.imageurl = imageurl;
      blog.Category =Category
      blog.WrittenBy =WrittenBy
      blog.Title = Title
      blog.Designation = Designation
      await this.BlogRepository.update({blogid},{...blog})
      return res.status(HttpStatus.OK).send({ status: "success", message: "Blog update Successfully", })
    }
    @Get('all')
    async allblog( @Res() res: Response){
      const allblog = await this.BlogRepository.find({})
      return res.status(HttpStatus.OK).send({allblog})
    }

    @Delete('delete/:blogid')
    async Deleteblog(
       @Param('blogid') blogid: string,
       @Req() req: Request,
       @Res() res: Response) {
       const blog = await this.BlogRepository.delete(blogid)
       if (!blog) {
        return res.status(HttpStatus.NOT_FOUND).send({
          status: "error",
          message: "blog not found",
        });
      }
       return res.status(HttpStatus.OK).json({ message: 'blog has deleted' });
    }


}
