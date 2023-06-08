import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFiles, Req, Res, HttpStatus } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { GCSStorageService } from 'src/s3/s3.service';
import { Request, Response } from 'express';


@ApiTags('Employees')
@Controller('employee')
export class EmployeeController {
  constructor( @InjectRepository(Employee) private EmployeeRepository: Repository<Employee>,
  private readonly employeeService: EmployeeService,
  private s3service: GCSStorageService) {}
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

    const{Designation,FullName} =req.body;
      let imageurl = null;
    if (file.imageurl && file.imageurl.length > 0) {
      imageurl = await this.s3service.Addimage(file.imageurl[0]);
    }
    const employee  = new Employee()
    employee.imageurl =imageurl
    employee.FullName = FullName
    employee.Designation =Designation
    await this.EmployeeRepository.save({...employee})
    return res.status(HttpStatus.OK).send({ status: "success", message: "Employee Added Successfully", })
  }

  @Patch('update/:Employeeid')
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
  async Updateemployee(
    @UploadedFiles()
    file: {
      imageurl?: Express.Multer.File[]},
    
    @Param('Employeeid') Employeeid: string,
    @Req() req: Request,
    @Body() body,
    @Res() res: Response){
    const{Designation,FullName} =req.body;
    let imageurl = null;
    if (file.imageurl && file.imageurl.length > 0) {
      imageurl = await this.s3service.Addimage(file.imageurl[0]);
    }

    const employee = await this.EmployeeRepository.findOne({where:{Employeeid}}); // Retrieve testimonial by ID instead of UUID

    if (!employee) {
      return res.status(HttpStatus.NOT_FOUND).send({
        status: "error",
        message: "employee not found",
      });
    }
    employee.imageurl =imageurl
    employee.Designation =Designation
    employee.FullName = FullName
    employee.Designation =Designation
    await this.EmployeeRepository.update({Employeeid},{...employee})
    return res.status(HttpStatus.OK).send({ status: "success", message: "Employee update Successfully", })
  }

  @Get('all')
  async allemployee( @Res() res: Response){
    const allprojects = await this.EmployeeRepository.find({})
    return res.status(HttpStatus.OK).send({allprojects})
  }

  
  @Delete('delete/:Employeeid')
  async DeleteEmployee(
     @Param('Employeeid') Employeeid: string,
     @Req() req: Request,
     @Res() res: Response) {
    const employee= await this.EmployeeRepository.delete(Employeeid)
    if (!employee) {
      return res.status(HttpStatus.NOT_FOUND).send({
        status: "error",
        message: "employee not found",
      });
    }
     return res.status(HttpStatus.OK).json({status:"succes", message: 'Employee has deleted' });
  }

}
