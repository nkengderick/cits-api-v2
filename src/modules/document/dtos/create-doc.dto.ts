import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { DocumentType } from '../schemas/document.schema';

export class CreateDocumentDto {
  @ApiProperty({ example: '123456789' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ example: DocumentType.ID_CARD, enum: DocumentType })
  @IsEnum(DocumentType)
  documentType: DocumentType;

  @ApiProperty({ example: 'EncryptedDocumentData' })
  @IsString()
  @IsNotEmpty()
  content: string;
}
