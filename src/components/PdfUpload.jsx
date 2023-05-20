import React, { useState } from 'react';
import { pdfjs } from 'react-pdf';
import { loader } from "../assets";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfUpload = ({ onPdfParsed }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
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

                onPdfParsed(text);
            };
            reader.readAsArrayBuffer(file);
        }
    };

    return (
        <div>
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
            <button onClick={handleUpload}>
                Submit
            </button>
        </div>
    );
};

export default PdfUpload;