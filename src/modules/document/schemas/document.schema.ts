import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type DocumentDocument = DocumentEntity & Document;

export enum DocumentType {
  ID_CARD = 'idCard',
  BIRTH_CERTIFICATE = 'birthCertificate',
  AL_CERTIFICATE = 'aLevelCertificate',
  OL_CERTIFICATE = 'oLevelCertificate',
  PASSPORT = 'passport',
}

@Schema({ timestamps: true })
export class DocumentEntity {
  @ApiProperty({
    example: '123456789',
    description: 'ID of the associated user',
  })
  @Prop({ required: true })
  userId: string;

  @ApiProperty({
    example: DocumentType.ID_CARD,
    enum: DocumentType,
    description: 'Type of document',
  })
  @Prop({ required: true, enum: DocumentType })
  documentType: DocumentType;

  @ApiProperty({
    description: 'Content or data of the document',
    example: 'EncryptedDocumentData',
  })
  @Prop({ required: true })
  content: string;
}

export const DocumentSchema = SchemaFactory.createForClass(DocumentEntity);
