import React, { useState } from 'react';
import { Storage } from 'aws-amplify';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const ResumeViewer = ({ fileName }) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [numPages, setNumPages] = useState(null);

  const handleFileClick = async () => {
    try {
      const fileUrl = await Storage.get(`resumes/${fileName}`);
      setPdfUrl(fileUrl);
    } catch (error) {
      console.error('Error fetching resume file:', error);
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div>
      <button onClick={handleFileClick}>
        <i className="fas fa-file-pdf"></i> {fileName}
      </button>
      {pdfUrl && (
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
      )}
    </div>
  );
};

export default ResumeViewer;
