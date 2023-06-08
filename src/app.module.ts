
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from './projects/projects.module';
import { ConfigModule } from '@nestjs/config';
import { EmployeeModule } from './employee/employee.module';
import { TestimonialModule } from './testimonial/testimonial.module';
import { ServiceModule } from './service/service.module';
import { BlogModule } from './blog/blog.module';
import { ContactModule } from './contact/contact.module';
import { HeroModule } from './hero/hero.module';
import { Produtcs } from './projects/entities/product.entitt';
import { Testimonial } from './testimonial/entities/testimonial.entity';
import { Blog } from './blog/entities/blog.entity';
import { Contact } from './contact/entities/contact.entity';
import { Services } from './service/entities/services.entity';
import { Employee } from './employee/entities/employee.entity';
import { Hero } from './hero/entities/hero.entity';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal:true, envFilePath: '.env', }),
    TypeOrmModule.forRoot({
      type:'mysql',
      username:"flyfarin_erp",
      password: "@Kayes70455",
      host: "flyfarint.com",
      database:"flyfarin_tech",

      // username:"root",api-flyfartech-v1
      // password: "",
      // host: "127.0.0.1",
      // database:"flyfartech",
      port:3306,
      entities:[Produtcs, Testimonial, Blog, Contact, Services, Employee, Hero],
      synchronize:false

    }
    ),
    ProjectsModule,
    EmployeeModule,
    TestimonialModule,
    ServiceModule,
    BlogModule,
    ContactModule,
    HeroModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
