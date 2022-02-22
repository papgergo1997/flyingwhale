import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage';
import { BehaviorSubject, Observable } from 'rxjs';
import { exhaustMap, map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Photo } from '../model/photo';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PhotoUploadService {
  list$: BehaviorSubject<Photo[]> = new BehaviorSubject<Photo[]>([]);
  image$: BehaviorSubject<Photo> = new BehaviorSubject<Photo>(null);
  progress: BehaviorSubject<any> = new BehaviorSubject<any>(0);
  dbURL =
    'https://flyingwhale-625ae-default-rtdb.europe-west1.firebasedatabase.app/images';
  firebaseApp = initializeApp(environment.firebase);
  storage = getStorage(this.firebaseApp);
  storageRef = ref(this.storage);
  currentUser: any;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.currentUser = JSON.parse(localStorage.getItem('user'));
  }

  pushFileToStorage(photo: Photo): void {
    const imagesRef = ref(this.storage, 'images/' + photo.file.name);
    const uploadTask = uploadBytesResumable(imagesRef, photo.file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        this.progress.next(
          ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0)
        );
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
          photo.name = photo.file.name;
          // this.progress.next(0)
          this.saveImageData(photo);
        });
      }
    );
  }
  saveImageData(doc: Photo): void {
    if (this.currentUser != null) {
      this.http
        .post<Photo>(`${this.dbURL}.json?auth=${this.currentUser._token}`, doc)
        .subscribe((res) => {
          this.getImage(res.name)
          this.getImages()});
    } else {
      this.authService.currentUser
        .pipe(
          take(1),
          exhaustMap((user) => {
            return this.http.post<Photo>(
              `${this.dbURL}.json?auth=${user.token}`,
              doc
            );
          })
        )
        .subscribe(() => this.getImages());
    }
  }
  getImage(key: string): void{
    this.http.get<Photo>(`${this.dbURL}/${key}.json`).subscribe((image)=>this.image$.next(image) )
  }
  getImages(): void {
    if (this.currentUser != null) {
      this.http
        .get(`${this.dbURL}.json?auth=${this.currentUser._token}`)
        .pipe(
          map((resp) => {
            const arr = [];
            for (const key in resp) {
              if (resp.hasOwnProperty(key)) {
                arr.push({ ...resp[key], key: key });
              }
            }
            return arr;
          })
        )
        .subscribe((list) => this.list$.next(list));
    } else {
      this.authService.currentUser
        .pipe(
          take(1),
          exhaustMap((user) => {
            return this.http.get(`${this.dbURL}.json?auth=${user.token}`);
          }),
          map((resp) => {
            const arr = [];
            for (const key in resp) {
              if (resp.hasOwnProperty(key)) {
                arr.push({ ...resp[key], id: key });
              }
            }
            return arr;
          })
        )
        .subscribe((list) => this.list$.next(list));
    }
  }
  deleteImageFrDB(key: string): void {
    if (this.currentUser != null) {
      this.http
        .delete(`${this.dbURL}/${key}.json?auth=${this.currentUser._token}`)
        .subscribe(() => this.getImages());
    } else {
      this.authService.currentUser
        .pipe(
          take(1),
          exhaustMap((user) => {
            return this.http.delete<Photo>(
              `${this.dbURL}.json?auth=${user.token}`
            );
          })
        )
        .subscribe(() => this.getImages());
    }
  }
  deleteImageFrStAndDB(name: string, key: string): void {
    deleteObject(ref(this.storage, 'images/' + name))
      .then(() => {
        console.log(`The file ${name} was deleted successfully`);
        this.deleteImageFrDB(key);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  deleteImages(
    name: string,
    id: string,
    secondName?: string,
    secondId?: string
  ): void {
    if (secondName) {
      this.deleteImageFrStAndDB(name, id);
      this.deleteImageFrStAndDB(secondName, secondId);
    } else {
      this.deleteImageFrStAndDB(name, id);
    }
  }
}
