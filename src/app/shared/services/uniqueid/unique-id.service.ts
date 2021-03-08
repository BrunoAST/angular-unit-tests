import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UniqueIdService {
  private _numberOfGeneratedIds = 0;

  generateUniqueIdWithPrefix(prefix: string): string {
    if (!prefix) {
      throw Error('Prefix can not be empty');
    }

    const uniqueId = this._generateUniqueId();
    this._numberOfGeneratedIds++;
    return `${prefix}-${uniqueId}`;
  }

  getNumberOfGeneratedIds(): number {
    return this._numberOfGeneratedIds;
  }

  private _generateUniqueId(): string {
    return uuidv4();
  }
}
