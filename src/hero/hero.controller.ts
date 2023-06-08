import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Req, Res, HttpStatus } from '@nestjs/common';
import { HeroService } from './hero.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Hero } from './entities/hero.entity';
import { Repository } from 'typeorm';
import { GCSStorageService } from 'src/s3/s3.service';
import { Request, Response } from 'express';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';

@ApiTags('Videos')
@Controller('hero')
export class HeroController {
  constructor(private readonly heroService: HeroService,
    @InjectRepository(Hero) private HeroRepository: Repository<Hero>,
    private s3service: GCSStorageService) {}


    
    @Post('Addvideos')
    @UseInterceptors(FileFieldsInterceptor([
      { name: 'deployurl', maxCount: 2 },
      { name: 'codeurl', maxCount: 2 },
      { name: 'buildurl', maxCount: 2 },
      { name: 'designurl', maxCount: 2 },
    ]))
    @ApiConsumes('multipart/form-data')
    @ApiBody({
      schema: {
        type: 'object',
        properties: { 
          // 👈  field names need to be repeated for swagger
          buildurl: {
            type: 'string',
            format: 'binary',
          },
          deployurl: {
            type: 'string',
            format: 'binary',
          },
          codeurl: {
            type: 'string',
            format: 'binary',
          },
          designurl: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    })
    async addvideos( 
      @UploadedFiles()
      file: {
        codeurl?: Express.Multer.File,
        buildurl?: Express.Multer.File
        designurl?: Express.Multer.File
        deployurl?: Express.Multer.File
       },
    @Req() req: Request,
    @Body() body,
    @Res() res: Response){
      const code = file.codeurl? await this.s3service.Addvideos(file.codeurl[0]):null
      const build = file.buildurl? await this.s3service.Addvideos(file.buildurl[0]):null
      const design = file.designurl? await this.s3service.Addvideos(file.designurl[0]):null
      const deploy = file.deployurl? await this.s3service.Addvideos(file.deployurl[0]):null
      const products  = new Hero()
      products.Build =build
      products.Code=code
      products.Deploy=deploy
      products.Design=design
      await this.HeroRepository.save({...products})
      return res.status(HttpStatus.OK).send({ status: "success", message: "Project Added Successfully", })

    }
    @Get('allvideos')
    async allvideos( @Res() res: Response){
      const allvideos = await this.HeroRepository.find({})
      return res.status(HttpStatus.OK).send({allvideos})
    }


    @Delete('delete/:heroid')
    async Deletehero(
       @Param('heroid') heroid: string,
       @Req() req: Request,
       @Res() res: Response) {
       await this.HeroRepository.delete(heroid)
       return res.status(HttpStatus.OK).json({ message: 'heroi has deleted' });
    }
}
