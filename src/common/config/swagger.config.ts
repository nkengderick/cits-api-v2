import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('CamLingo 237 API')
  .setDescription('API documentation for the Cam Lingo 237 Application')
  .setVersion('1.0')
  .build();
