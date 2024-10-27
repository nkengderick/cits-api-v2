import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  DocumentEntity,
  DocumentDocument,
  DocumentType,
} from '../schemas/document.schema';
import { CreateDocumentDto } from '../dtos/create-doc.dto';
import { UpdateDocumentDto } from '../dtos/update-doc.dto';

@Injectable()
export class DocumentRepository {
  constructor(
    @InjectModel(DocumentEntity.name)
    private readonly documentModel: Model<DocumentDocument>,
  ) {}

  async createDocument(
    createDocumentDto: CreateDocumentDto,
  ): Promise<DocumentEntity> {
    const newDocument = new this.documentModel(createDocumentDto);
    return newDocument.save();
  }

  async findByUserId(
    userId: string,
    documentType?: DocumentType,
    limit = 10,
    offset = 0,
  ): Promise<DocumentEntity[]> {
    const filter = { userId };

    if (documentType) {
      filter['documentType'] = documentType;
    }

    return this.documentModel.find(filter).skip(offset).limit(limit).exec();
  }

  async findById(documentId: string): Promise<DocumentEntity | null> {
    return this.documentModel.findById(documentId).exec();
  }

  async updateDocument(
    documentId: string,
    updateDocumentDto: UpdateDocumentDto,
  ): Promise<DocumentEntity | null> {
    return this.documentModel
      .findByIdAndUpdate(documentId, updateDocumentDto, { new: true })
      .exec();
  }

  async deleteDocument(documentId: string): Promise<DocumentEntity | null> {
    return this.documentModel.findByIdAndDelete(documentId).exec();
  }
}
