import { IStorageProvider } from '../IStorageProvider';

export class FakeStorageProivider implements IStorageProvider {
  private storage: string[] = [];

  async save(file: string, folder: string): Promise<string> {
    this.storage.push(file);
    return file;
  }

  async delete(file: string, folder: string): Promise<boolean> {
    const findIndex = this.storage.findIndex(
      storageFile => storageFile === file,
    );

    this.storage.splice(findIndex, 1);

    return true;
  }
}
