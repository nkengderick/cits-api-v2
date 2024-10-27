import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentRepository } from '../repositories/document.repository';
import { DocumentEntity, DocumentType } from '../schemas/document.schema';
import { CreateDocumentDto } from '../dtos/create-doc.dto';
import { UpdateDocumentDto } from '../dtos/update-doc.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class DocumentService {
  constructor(private readonly documentRepository: DocumentRepository) {}

  async createDocument(
    createDocumentDto: CreateDocumentDto,
  ): Promise<DocumentEntity> {
    return this.documentRepository.createDocument(createDocumentDto);
  }

  // Retrieve documents by userId with optional documentType filter and pagination
  async getDocumentsByUserId(
    userId: string,
    documentType?: DocumentType,
    limit = 10,
    offset = 0,
  ): Promise<DocumentEntity[]> {
    return this.documentRepository.findByUserId(
      userId,
      documentType,
      limit,
      offset,
    );
  }

  async getDocumentById(documentId: string): Promise<DocumentEntity> {
    const document = await this.documentRepository.findById(documentId);
    if (!document) throw new NotFoundException('Document not found');
    return document;
  }

  async updateDocument(
    documentId: string,
    updateDocumentDto: UpdateDocumentDto,
  ): Promise<DocumentEntity> {
    const updatedDocument = await this.documentRepository.updateDocument(
      documentId,
      updateDocumentDto,
    );
    if (!updatedDocument) throw new NotFoundException('Document not found');
    return updatedDocument;
  }

  async deleteDocument(documentId: string): Promise<void> {
    const deletedDocument =
      await this.documentRepository.deleteDocument(documentId);
    if (!deletedDocument) throw new NotFoundException('Document not found');
  }

  // Path to the documents folder using absolute path resolution
  private documentsPath = path.join(process.cwd(), 'documents');

  async findDocs(documentTypes?: DocumentType[]): Promise<DocumentEntity[]> {
    const documentTypesToSearch =
      documentTypes && documentTypes.length > 0
        ? documentTypes
        : Object.values(DocumentType);

    const documents: DocumentEntity[] = [];

    for (const type of documentTypesToSearch) {
      const filePath = path.join(this.documentsPath, `${type}.pdf`);

      if (fs.existsSync(filePath)) {
        const fileBuffer = fs.readFileSync(filePath); // Ensure file read directly as a buffer
        const base64Content = fileBuffer.toString('base64');

        console.log(`File path: ${filePath}`);
        console.log(`File length: ${fileBuffer.length}`);
        console.log(
          `Base64 content (first 50 chars): ${base64Content.slice(0, 50)}`,
        );
        console.log(
          `Base64 content (next 50 chars): ${base64Content.slice(100, 150)}`,
        );

        const documentEntity: DocumentEntity = {
          userId: 'N/A',
          documentType: type,
          content: base64Content,
        };

        documents.push(documentEntity);
      } else {
        console.warn(
          `File for document type ${type} not found at path ${filePath}`,
        );
      }
    }

    if (documents.length === 0) {
      throw new NotFoundException(
        'No documents found for the specified filters.',
      );
    }

    return documents;
  }
}
