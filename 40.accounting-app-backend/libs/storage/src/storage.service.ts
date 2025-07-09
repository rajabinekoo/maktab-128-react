import { Injectable } from '@nestjs/common';

import * as crypto from 'crypto';
import { join } from 'node:path';
import { v4 as uuidv4 } from 'uuid';
import { unlink, writeFile } from 'node:fs/promises';

import { imageStoragePath } from './storage.constants';

@Injectable()
export class StorageService {
  private generateUniqueId(format: string) {
    return (
      crypto
        .createHash('sha1')
        .update(Date.now() + uuidv4())
        .digest('hex') +
      '.' +
      format
    );
  }

  public async put(buffer: Buffer<ArrayBufferLike>, mimetype: string) {
    const format = mimetype.split('/')[1].replace('jpeg', 'jpg');
    const name = this.generateUniqueId(format);
    const path = join(imageStoragePath, name);
    await writeFile(path, buffer);
    return name;
  }

  public async delete(filename: string) {
    const path = join(imageStoragePath, filename);
    try {
      await unlink(path);
    } catch (error) {
      console.error(error);
      return false;
    }
    return true;
  }
}
