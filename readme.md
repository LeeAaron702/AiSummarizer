# SwiftSummary

SwiftSummary is a web application that allows users to summarize articles using OpenAI GPT. It provides a simplified reading experience by transforming lengthy articles into clear and concise summaries. The application also supports PDF parsing, with summarizing ability coming soon.

## Prerequisites

- Node.js (v14 or above)
- React (v16 or above)
- Redux Toolkit (v1.6 or above)

## Installation

Clone the repository.

```
git clone https://github.com/LeeAaron702/AiSummarizer
```
Navigate to the project directory and install the dependencies.
```
cd AiSummarizer
npm install
```

Start the development server.
```
npm start
```

The application will be accessible at http://localhost:3000.

## Code Structure
The codebase is structured as follows:

- src/components/Demo.jsx: React component that handles the article summarization functionality. It includes form submission, fetching summaries from the API, storing articles in localStorage, and displaying the results.
- src/components/Hero.jsx: React component that displays the header section of the application, including the logo, GitHub button, and introductory text.
- src/components/PdfUpload.jsx: React component for uploading PDF files, parsing the text content, and displaying the extracted text. It also provides the option to copy the extracted text to the clipboard.
- src/services/article.js: Service file that defines the API endpoint for fetching article summaries using OpenAI GPT.
- src/index.js: Entry point of the application, rendering the root component into the DOM.

## Usage
- Open the application in your web browser.
- Enter the URL of the article you want to summarize in the provided input field.
- Click the "Submit" button to fetch and display the summary of the article.
- Optionally, you can upload a PDF file using the "Upload PDF" button in the PdfUpload section. The extracted text will be displayed, and you can copy it to the clipboard.
- The application keeps track of previously summarized articles, which are displayed in the history section. You can click on a link to view the summary again.
- Summaries are stored in the browser's localStorage, allowing them to persist across page reloads.


## License
This project is licensed under the MIT License.

