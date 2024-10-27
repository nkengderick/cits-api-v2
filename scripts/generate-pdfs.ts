import * as fs from 'fs';
import * as path from 'path';
import * as PDFDocument from 'pdfkit';

const documentTypes = [
  'idCard',
  'birthCertificate',
  'passport',
  'oLevelCertificate',
  'aLevelCertificate',
];
const documentsPath = path.join(__dirname, '..', 'documents');

// Ensure documents folder exists
if (!fs.existsSync(documentsPath)) {
  fs.mkdirSync(documentsPath);
}

// Generate sample PDFs for each document type
documentTypes.forEach((type) => {
  const doc = new PDFDocument();
  const filePath = path.join(documentsPath, `${type}.pdf`);

  doc.pipe(fs.createWriteStream(filePath));
  doc.fontSize(25).text(`Sample PDF for ${type}`, 100, 100);
  doc.end();

  console.log(`Generated ${filePath}`);
});
