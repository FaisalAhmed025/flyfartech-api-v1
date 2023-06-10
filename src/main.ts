import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const port = process.env.PORT || 5000
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HelmetMiddleware } from '@nest-middlewares/helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.enableCors();
  const config = new DocumentBuilder()
  .setTitle('FlyFar Tech')
  .setDescription('FlyFar Tech')
  .setVersion('1.0')
  .addTag('FFT')
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.use(HelmetMiddleware)
  await app.listen(port);
}
bootstrap();
