import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { Observable } from 'rxjs';
import { Photo } from '../model/photo';

@Injectable({
  providedIn: 'root',
})
export class PhotoUploadService {
  dbURL =
    'https://flyingwhale-625ae-default-rtdb.europe-west1.firebasedatabase.app/images';
  storage = getStorage();
  storageRef = ref(this.storage);

  constructor(private http: HttpClient) {}

  pushFileToStorage(photo: Photo): void {
    const imagesRef = ref(this.storage, 'images/' + photo.file.name);
    const uploadTask = uploadBytesResumable(imagesRef, photo.file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;

          // ...

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          photo.url = downloadURL;
          photo.name = photo.file.name
          this.saveImageData(photo);
        });
      }
    );
  }
  saveImageData(doc: Photo): void {
    this.http
      .post<Photo>(`${this.dbURL}.json`, doc)
      .subscribe((resp) => console.log(resp));
  }
}
