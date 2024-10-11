import { convertFileWithPandoc } from './pandoc';
import fs from 'fs';

const resolvers = {
  Mutation: {
    convertFileWithPandoc: async (_: any, { fileContent, fileName }: { fileContent: string, fileName: string }) => {
      // Save fileContent to a temporary file
      const tempFilePath = `/tmp/${fileName}`;
      await fs.promises.writeFile(tempFilePath, fileContent);

      // Convert the file using Pandoc
      try {
        const convertedFilePath = await convertFileWithPandoc(tempFilePath);
        const convertedContent = await fs.promises.readFile(convertedFilePath, 'utf8');

        return { convertedContent };
      } catch (error) {
        console.error('Pandoc conversion error:', error);
        throw new Error('Failed to convert file');
      }
    },
  },
};
