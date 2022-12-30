import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private storage: AngularFireStorage) { }

  uploadFileToStorage(id: string, file: File) {
    const uploadPath = `images/${id}/${file.name}`;
    return this.storage.ref(uploadPath).put(file);
  }
}
