import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Observable, of, Subscription } from 'rxjs';
import { Photo } from 'src/app/model/photo';
import { ItemService } from 'src/app/service/item.service';
import { PhotoUploadService } from 'src/app/service/photo-upload.service';
import { CroppedEvent } from 'ngx-photo-editor';
import { map } from 'rxjs/operators';
import { CategoryService } from 'src/app/service/category.service';
import { Category } from 'src/app/model/category';
import { TechService } from 'src/app/service/tech.service';
import { Tech } from 'src/app/model/tech';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss'],
})
export class ItemEditComponent implements OnInit {
  //FOR CROPPER
  imageChangedEvent: any;
  base64: any;
  //
  list$: Photo[];
  categoryOpt: Category[] = [];
  techOpt: Tech[] = [];
  selectedFiles: any;
  currentPhoto: Photo;
  selectedPreviewFiles: any;
  currentPreviewPhoto: Photo;
  imageURLs: string[] = [];
  imageNames: string[] = [];
  imageIds: string[] = [];
  progress: number = 100;
  newCat: boolean = false;
  newTech: boolean = false;
  subscription: Subscription = new Subscription();

  form = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    name: new FormControl(''),
    description: new FormControl(''),
    category: new FormControl(''),
    tech: new FormControl(''),
    images: new FormControl(''),
    mainImage: new FormControl(''),
    date: new FormControl(''),
    imageId: new FormControl(''),
    imageName: new FormControl(''),
    newCategory: new FormControl(''),
    newTech: new FormControl(''),
  });

  constructor(
    private iService: ItemService,
    private phUService: PhotoUploadService,
    private dialogRef: MatDialogRef<ItemEditComponent>,
    private catService: CategoryService,
    private techService: TechService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.form.patchValue(data);
  }

  ngOnInit(): void {
    this.form.get('newCategory').reset();
    this.form.get('newTech').reset();
    this.catService.getAll();
    this.techService.getAll();
    this.catService.list$.subscribe((list) => (this.categoryOpt = list));
    this.techService.list$.subscribe((list) => (this.techOpt = list));
    this.phUService.list$.subscribe((list) => (this.list$ = list));
    console.log(this.form.get('images').value[1])
  }

  onSubmit(): void {
    if (this.form.get('id')?.value == '0') {
      this.form.patchValue({
        imageId: this.imageIds,
        imageName: this.imageNames,
        images: this.imageURLs,
        mainImage: this.imageURLs[0],
      });
      console.log(this.imageIds, this.imageNames, this.imageURLs);
      this.iService.create(this.form.value);
      this.dialogRef.close();
      this.progress = 0;
    } else {
      this.iService.update(this.form.getRawValue());
      this.dialogRef.close();
    }
  }

  onUpload(): void {
    const file = this.selectedFiles;
    this.selectedFiles = undefined;
    this.currentPhoto = new Photo(file[0]);

    // const previewFile = this.selectedPreviewFiles;
    // this.selectedPreviewFiles = undefined;
    // this.currentPreviewPhoto = new Photo(previewFile);
    this.phUService.progress.subscribe((value) => (this.progress = value));
    this.phUService.pushFileToStorage(this.currentPhoto);

    this.subscription = this.phUService.image$.subscribe((image) => {
      console.log(image);
      if (image != null) {
        this.imageIds.push(image.key);
        this.imageNames.push(image.name);
        this.imageURLs.push(image.url);
        this.phUService.image$.next(null);
        this.subscription.unsubscribe();
      }
    });
    // this.phUService.list$.subscribe((list) => {
    //   console.log(list);
    //   list.slice(list.length - 1, list.length).map((image) => {
    //
    //   });
    // });
  }
  // onUploadMain() {
  //   const file = this.selectedFiles;
  //   this.selectedFiles = undefined;
  //   this.currentPhoto = new Photo(file[0]);

  //   this.phUService.progress.subscribe((value) => (this.progress = value));
  //   of(this.phUService.pushFileToStorage(this.currentPhoto)).subscribe(() =>
  //     this.phUService.list$.subscribe((list) => {
  //       this.form.patchValue({
  //         mainImage: list
  //           .slice(list.length - 1, list.length)
  //           .map((image) => {
  //             console.log(image.url);
  //             return image.url;
  //           })
  //           .toString(),
  //       });
  //     })
  //   );
  // }

  // upload(photo: Photo, preview: boolean): void {
  //   if (preview == false) {
  //     of(this.phUService.pushFileToStorage(photo)).subscribe(() =>
  //       this.phUService.list$.subscribe((list) => {
  //         this.form.patchValue({
  //           image: list
  //             .slice(list.length - 1, list.length)
  //             .map((image) => {
  //               //GET THE KEY AND NAME FROM HERE!!!!
  //               this.imageIds.push(image.key);
  //               this.imageNames.push(image.name);
  //               return image.url;
  //             })
  //             .toString(),
  //         });
  //       })
  //     );
  //   } else if (preview == true) {
  //     of(this.phUService.pushFileToStorage(photo)).subscribe(() =>
  //       this.phUService.list$.subscribe((list) => {
  //         this.form.patchValue({
  //           previewImage: list
  //             .slice(list.length - 2, list.length)
  //             .map((image) => image.url)
  //             .toString(),
  //         });
  //       })
  //     );
  //   }
  // }

  fileChangeEvent(event: any): void {
    // this.imageChangedEvent = event;
    this.selectedFiles = event.target.files;
  }

  // imageCropped(event: CroppedEvent): void {
  //   this.selectedPreviewFiles = event.file;
  // }

  createNewCat(): void {
    if (this.form.get('newCategory').value != null) {
      this.catService.create({
        id: Math.random()
          .toString(36)
          .replace(/[^a-zA-Z0-9]+/g, '')
          .substr(2, 10),
        name: this.form.get('newCategory').value,
        description: '',
      });
      this.catService.getAll();
      this.form.get('newCategory').reset();
      this.newCat = false;
    } else {
      return;
    }
  }
  createNewTech(): void {
    if (this.form.get('newTech').value != null) {
      this.techService.create({
        id: Math.random()
          .toString(36)
          .replace(/[^a-zA-Z0-9]+/g, '')
          .substr(2, 10),
        name: this.form.get('newTech').value,
      });
      this.techService.getAll();
      this.form.get('newTech').reset();
      this.newTech = false;
    } else {
      return;
    }
  }
  // reverseString(string: string): void {
  //   console.log(string.split('').reverse().join())
  // }

  close(): void {
    this.dialogRef.close();
  }
}
