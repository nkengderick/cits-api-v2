import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBody,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
} from '@nestjs/swagger';
import { DocumentService } from '../services/document.service';
import { DocumentEntity, DocumentType } from '../schemas/document.schema';
import { CreateDocumentDto } from '../dtos/create-doc.dto';
import { UpdateDocumentDto } from '../dtos/update-doc.dto';

@ApiTags('Documents')
@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @ApiOperation({ summary: 'Create a new document for a user' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Document successfully created.',
    type: DocumentEntity,
  })
  @ApiBadRequestResponse({
    description: 'Invalid input data or document creation failed.',
  })
  @ApiBody({
    type: CreateDocumentDto,
    description: 'Data required to create a new document.',
  })
  @Post()
  async createDocument(
    @Body() createDocumentDto: CreateDocumentDto,
  ): Promise<DocumentEntity> {
    return this.documentService.createDocument(createDocumentDto);
  }

  @ApiOperation({
    summary:
      'Retrieve documents for a user with optional filtering and pagination',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of documents retrieved successfully.',
    type: [DocumentEntity],
  })
  @ApiParam({
    name: 'userId',
    type: String,
    description: 'ID of the user whose documents are to be retrieved.',
    example: '123456789',
  })
  @ApiQuery({
    name: 'documentType',
    enum: DocumentType,
    required: false,
    description:
      'Filter documents by type (e.g., idCard, birthCertificate, passport).',
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
    description: 'Limit the number of documents returned (default: 10).',
    example: 10,
  })
  @ApiQuery({
    name: 'offset',
    type: Number,
    required: false,
    description: 'Number of documents to skip for pagination (default: 0).',
    example: 0,
  })
  @Get('user/:userId')
  async getDocumentsByUserId(
    @Param('userId') userId: string,
    @Query('documentType') documentType?: DocumentType,
    @Query('limit') limit = 10,
    @Query('offset') offset = 0,
  ): Promise<DocumentEntity[]> {
    return this.documentService.getDocumentsByUserId(
      userId,
      documentType,
      +limit,
      +offset,
    );
  }

  @ApiOperation({ summary: 'Retrieve a single document by its ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Document retrieved successfully.',
    type: DocumentEntity,
  })
  @ApiNotFoundResponse({ description: 'Document not found' })
  @ApiParam({
    name: 'documentId',
    type: String,
    description: 'ID of the document to retrieve.',
    example: '60c72b2f9a9f4e1d88d7f9c2',
  })
  @Get(':documentId')
  async getDocumentById(
    @Param('documentId') documentId: string,
  ): Promise<DocumentEntity> {
    return this.documentService.getDocumentById(documentId);
  }

  @ApiOperation({ summary: 'Update an existing document by its ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Document updated successfully.',
    type: DocumentEntity,
  })
  @ApiNotFoundResponse({ description: 'Document not found' })
  @ApiBadRequestResponse({
    description: 'Invalid input data or document update failed.',
  })
  @ApiParam({
    name: 'documentId',
    type: String,
    description: 'ID of the document to update.',
    example: '60c72b2f9a9f4e1d88d7f9c2',
  })
  @ApiBody({
    type: UpdateDocumentDto,
    description: 'Data for updating the document.',
  })
  @Put(':documentId')
  async updateDocument(
    @Param('documentId') documentId: string,
    @Body() updateDocumentDto: UpdateDocumentDto,
  ): Promise<DocumentEntity> {
    return this.documentService.updateDocument(documentId, updateDocumentDto);
  }

  @ApiOperation({ summary: 'Delete a document by its ID' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Document successfully deleted.',
  })
  @ApiNotFoundResponse({ description: 'Document not found' })
  @ApiParam({
    name: 'documentId',
    type: String,
    description: 'ID of the document to delete.',
    example: '60c72b2f9a9f4e1d88d7f9c2',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':documentId')
  async deleteDocument(@Param('documentId') documentId: string): Promise<void> {
    await this.documentService.deleteDocument(documentId);
  }
  @ApiOperation({
    summary:
      'Retrieve file-based documents for a user by multiple document types',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Documents retrieved successfully from file storage.',
    type: [DocumentEntity],
  })
  @ApiNotFoundResponse({
    description: 'No documents found for the specified filters.',
  })
  @ApiParam({
    name: 'userId',
    type: String,
    description: 'ID of the user whose documents are to be retrieved.',
    example: '123456789',
  })
  @ApiQuery({
    name: 'documentType',
    enum: DocumentType,
    isArray: true, // Enable multi-select
    required: false,
    description:
      'Optional filter by document type (e.g., idCard, birthCertificate, passport).',
  })
  @Get('file/user/:userId')
  async findDocs(
    @Param('userId') userId: string,
    @Query('documentType') documentTypes?: DocumentType[],
  ): Promise<DocumentEntity[]> {
    return this.documentService.findDocs(documentTypes);
  }
}
