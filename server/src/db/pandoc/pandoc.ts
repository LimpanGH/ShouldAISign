import multer from 'multer';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

// Multer configuration for file uploads
const upload = multer({ dest: 'uploads/' }); // Upload folder

export const convertFileWithPandoc = (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(__dirname, 'output.md');
    exec(`pandoc ${filePath} -o ${outputPath}`, (error, stdout, stderr) => {
      if (error) {
        reject(`Pandoc error: ${stderr}`);
      } else {
        resolve(outputPath); // Return the path to the converted file
      }
    });
  });
};

// Middleware to handle file upload and conversion
export const handleFileUploadAndConvert = (req: any, res: any) => {
  const file = req.file;

  if (!file) {
    return res.status(400).send('No file uploaded');
  }

  const filePath = file.path;

  convertFileWithPandoc(filePath)
    .then((convertedContent) => {
      res.json({ convertedContent });
    })
    .catch((err) => {
      console.error('Error converting file:', err);
      res.status(500).send('File conversion failed');
    });
};

export { upload };
