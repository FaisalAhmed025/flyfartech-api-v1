
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsModule } from './projects/projects.module';
import { Produtcs } from './projects/entities/product.entitt';
import { ConfigModule } from '@nestjs/config';
import { Hero } from './hero/entities/hero.entity';
import { Services } from './service/entities/services.entity';
import { Contact } from './contact/entities/contact.entity';
import { Blog } from './blog/entities/blog.entity';
import { EmployeeModule } from './employee/employee.module';
import { Employee } from './employee/entities/employee.entity';
import { TestimonialModule } from './testimonial/testimonial.module';
import { Testimonial } from './testimonial/entities/testimonial.entity';
import { ServiceModule } from './service/service.module';
import { BlogModule } from './blog/blog.module';
import { ContactModule } from './contact/contact.module';
import { HeroModule } from './hero/hero.module';
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
      // port:3306,
      entities:[Produtcs,Hero,Services,Contact, Blog,Employee,Testimonial],
      synchronize:true

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
