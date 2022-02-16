import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Observable, of } from 'rxjs';
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
  categoryOpt: Category[] = [];
  techOpt: Tech[] =[];
  selectedFiles: any;
  currentPhoto: Photo;
  selectedPreviewFiles: any;
  currentPreviewPhoto: Photo;
  imageNames: string[] = [];
  imageIds: string[] = [];
  progress: number = 100;
  newCat: boolean = false;
  newTech: boolean = false;

  form = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    name: new FormControl(''),
    description: new FormControl(''),
    category: new FormControl(''),
    tech: new FormControl(''),
    image: new FormControl(''),
    previewImage: new FormControl(''),
    date: new FormControl(''),
    imageId: new FormControl(''),
    imageName: new FormControl(''),
    newCategory: new FormControl(''),
    newTech: new FormControl('')
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
    this.phUService.getImages();
    this.catService.getAll();
    this.techService.getAll();
    this.catService.list$.subscribe((list) => (this.categoryOpt = list));
    this.techService.list$.subscribe((list)=> this.techOpt = list)
  }

  onSubmit(): void {
    if (this.form.get('id')?.value == '0') {
      // PROVIDE THE KEY AND NAME HERE!!!!
      this.form.patchValue({
        imageId: this.imageIds,
        imageName: this.imageNames,
      });
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

    const previewFile = this.selectedPreviewFiles;
    this.selectedPreviewFiles = undefined;
    this.currentPreviewPhoto = new Photo(previewFile);
    this.phUService.progress.subscribe((value) => (this.progress = value));
    this.upload(this.currentPhoto, false);
    this.upload(this.currentPreviewPhoto, true);
  }

  upload(photo: Photo, preview: boolean): void {
    if (preview == false) {
      of(this.phUService.pushFileToStorage(photo)).subscribe(() =>
        this.phUService.list$.subscribe((list) => {
          this.form.patchValue({
            image: list
              .slice(list.length - 1, list.length)
              .map((image) => {
                //GET THE KEY AND NAME FROM HERE!!!!
                this.imageIds.push(image.key);
                this.imageNames.push(image.name);
                return image.url;
              })
              .toString(),
          });
        })
      );
    } else if (preview == true) {
      of(this.phUService.pushFileToStorage(photo)).subscribe(() =>
        this.phUService.list$.subscribe((list) => {
          this.form.patchValue({
            previewImage: list
              .slice(list.length - 2, list.length)
              .map((image) => image.url)
              .toString(),
          });
        })
      );
    }
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.selectedFiles = event.target.files;
  }

  imageCropped(event: CroppedEvent): void {
    this.selectedPreviewFiles = event.file;
  }

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
    if(this.form.get('newTech').value != null){
      this.techService.create({id: Math.random()
        .toString(36)
        .replace(/[^a-zA-Z0-9]+/g, '')
        .substr(2, 10), name: this.form.get('newTech').value });
        this.techService.getAll();
        this.form.get('newTech').reset();
        this.newTech = false;
    } else {
      return
    }
  }
  // reverseString(string: string): void {
  //   console.log(string.split('').reverse().join())
  // }

  close(): void {
    this.dialogRef.close();
  }
}
