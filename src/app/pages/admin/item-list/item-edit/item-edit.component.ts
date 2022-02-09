import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { of } from 'rxjs';
import { Photo } from 'src/app/model/photo';
import { ItemService } from 'src/app/service/item.service';
import { PhotoUploadService } from 'src/app/service/photo-upload.service';
import { CroppedEvent } from 'ngx-photo-editor';
import { map } from 'rxjs/operators';

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
  categoryOpt: string[] = ['logos', 'illustrations'];
  techOpt: string[] = ['colored', 'B&W'];
  selectedFiles: any;
  currentPhoto: Photo;
  selectedPreviewFiles: any;
  currentPreviewPhoto: Photo;

  form = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    name: new FormControl(''),
    description: new FormControl(''),
    category: new FormControl(''),
    tech: new FormControl(''),
    image: new FormControl(''),
    previewImage: new FormControl(''),
    imageId: new FormControl(''),
    imageName: new FormControl(''),
  });

  constructor(
    private iService: ItemService,
    private phUService: PhotoUploadService,
    private dialogRef: MatDialogRef<ItemEditComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.form.patchValue(data);
  }

  ngOnInit(): void {
    this.phUService.getImages();
  }

  onSubmit(): void {
    if (this.form.get('id')?.value == '0') {
      // PROVIDE THE KEY HERE!!!!
      this.iService.create(this.form.value);
      this.dialogRef.close();
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
    this.upload(this.currentPhoto, false);
    this.upload(this.currentPreviewPhoto, true);
    console.log(this.currentPhoto);
  }

  upload(photo: Photo, preview: boolean): void {
    if (preview == false) {
      of(this.phUService.pushFileToStorage(photo)).subscribe(() =>
        this.phUService.list$.subscribe((list) => {
          this.form.patchValue({
            image: list
              .slice(list.length - 1, list.length)
              .map((image) => {
                //GET THE KEY FROM HERE!!!!
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
  // onUpload(): void {
  //   const file = this.selectedFiles;
  //   this.selectedFiles = undefined;
  //   this.currentPhoto = new Photo(file[0]);

  //   this.upload(this.currentPhoto);
  // }

  // upload(photo: Photo): void {
  //   of(this.phUService.pushFileToStorage(photo)).subscribe(() =>
  //     this.phUService.list$.subscribe((list) => {
  //       console.log(list)
  //       this.form.patchValue({ image: list.map(image=>image.url).toString() });
  //     })
  //   );
  // }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.selectedFiles = event.target.files;
  }

  imageCropped(event: CroppedEvent): void {
    this.selectedPreviewFiles = event.file;
  }

  close(): void {
    this.dialogRef.close();
  }
}
