import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Tera Community Digital ID API')
  .setDescription(
    'API documentation for Tera Community’s Digital ID system. This service enables governmental bodies and approved third-party applications to streamline identity verification and document retrieval for users, allowing seamless onboarding and reducing the need for physical documentation.',
  )
  .setVersion('1.0.0')
  .addTag('Users', 'Endpoints for user authentication and verification')
  .addTag(
    'Documents',
    'Endpoints for accessing, verifying, and managing user documents',
  )
  .addTag(
    'Verification',
    'Endpoints for real-time identity and document verification',
  )
  .addTag(
    'Notifications',
    'Endpoints for sending reminders for renewals and status updates',
  )
  .addTag(
    'Community',
    'Endpoints for forums, discussions, messages, and community interactions. These endpoints enable communication between users and government representatives, allowing discussions, public messaging, and issue reporting within the community.',
  )
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Use the JWT token provided during authentication.',
    },
    'JWT-auth',
  )
  .setContact(
    'Tera Community Support',
    'https://www.teracommunity.gov/support',
    'support@teracommunity.gov',
  )
  .setLicense(
    'Government Data Use License',
    'https://www.teracommunity.gov/licenses',
  )
  .build();
