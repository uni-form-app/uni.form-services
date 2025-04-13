import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';

@Injectable()
export class FileService {
  async deleteFile(filePath: string): Promise<void> {
    try {
      await fs.unlink(filePath);
    } catch (error) {
      console.error(`Failed to delete file at ${filePath}:`, error);
      throw new Error('Erro ao deletar o arquivo');
    }
  }
}