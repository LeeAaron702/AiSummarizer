import React, { useState } from 'react';
import { Document } from 'pdfjs-dist';
import { pdfjs } from 'react-pdf';

import { copy, tick } from "../assets";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfUpload = ({ onPdfParsed }) => {
  const [pdfText, setPdfText] = useState('');
  const [copied, setCopied] = useState(false);

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const pdf = await pdfjs.getDocument({ data: new Uint8Array(event.target.result) }).promise;
        let text = '';

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          text += content.items.map(item => item.str).join(' ') + '\n';
        }

        setPdfText(text);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(pdfText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleClear = () => {
    setPdfText('');
  };

  return (
    <div className="mt-6">
      <input type="file" accept="application/pdf" onChange={handleUpload} className="hidden" id="pdfUpload" />
      <label htmlFor="pdfUpload" className="cursor-pointer flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
        Upload PDF
      </label>
      {pdfText && (
        <div className="mt-4 bg-white rounded-md shadow-sm">
          <div className="flex justify-between items-center px-4 py-2 bg-gray-100">
            <div className="copy_btn" onClick={handleCopy}>
              <img
                src={copied ? tick : copy}
                alt="copy_icon"
                className="w-[40%] h-[40%] object-contain"
              />
            </div>
            <button
              className="ml-2 flex-shrink-0 bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md px-3 py-1 text-white"
              onClick={handleClear}
            >
              Clear
            </button>
            <pre className="flex-1 text-gray-800 whitespace-pre-wrap break-all">{pdfText}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfUpload;
