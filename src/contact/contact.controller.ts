import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Req, Res, HttpStatus } from '@nestjs/common';
import { ContactService } from './contact.service';
import { GCSStorageService } from 'src/s3/s3.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './entities/contact.entity';
import { Repository } from 'typeorm';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';

@ApiTags('Contact')
@Controller('contact')
export class ContactController {
  constructor(
    @InjectRepository(Contact) private ContactRepository: Repository<Contact>,
    private s3service: GCSStorageService,
    private readonly contactService: ContactService) {}

  
  @Post('create')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'Attachment', maxCount: 2 }]))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      schema: {
        type: 'object',
        properties: { 
          Name: { type: 'string' },
          Description: { type: 'string' },
          Email: { type: 'string' },
          Category: { type: 'string' },
          imageurl: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })
  async Contact( 
    @UploadedFiles()
    file: {
      Attachment?: Express.Multer.File[]},
  @Req() req: Request,
  @Body() body,
  @Res() res: Response){
    const{ Name,Description ,Email,Category} =req.body;
    let imageurl = null;
    if (file.Attachment && file.Attachment.length > 0) {
      imageurl = await this.s3service.Addimage(file.Attachment[0]);
    }
    const products  = new Contact()
    products.imagelink =imageurl
    products.Name = Name
    products.Category =Category
    products.Description =Description
    products.Email =Email
    products.Attachment =imageurl
    await this.ContactRepository.save({...products})
    return res.status(HttpStatus.OK).send({ status: "success", message: "Thanks for contacting with us", })
  }
  
  @Get('all')
  async allcontact( @Res() res: Response){
    const allcontact = await this.ContactRepository.find({})
    return res.status(HttpStatus.OK).send({allcontact})
  }

  @Delete('delete/:contactid')
  async Deletecontact(
     @Param('contactid') contactid: string,
     @Req() req: Request,
     @Res() res: Response) {
     await this.ContactRepository.delete(contactid)
     return res.status(HttpStatus.OK).json({ message: 'contact has deleted' });
  }


}
