// src/components/PdfUpload.js

import React, { useState } from 'react';
import { Document } from 'pdfjs-dist';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfUpload = ({ onPdfParsed }) => {
    const [pdfText, setPdfText] = useState('');

    const handleUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = async (event) => {
                const pdf = await pdfjs.getDocument({data: new Uint8Array(event.target.result)}).promise;
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

    return (
        <div>
            <input type="file" accept="application/pdf" onChange={handleUpload} />
            <pre>{pdfText}</pre>
        </div>
    );
};

export default PdfUpload;

