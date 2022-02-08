import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemService } from 'src/app/service/item.service';

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss'],
})
export class ItemEditComponent implements OnInit {
categoryOpt: string[] = ['logos', 'illustrations',]
techOpt: string[] = ['colored', 'B&W',]

  form = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    name: new FormControl(''),
    description: new FormControl(''),
    category: new FormControl(''),
    tech: new FormControl(''),
    image: new FormControl(''),
    imageId: new FormControl(''),
    imageName: new FormControl(''),
  });

  constructor(
    private iService: ItemService,
    private dialogRef: MatDialogRef<ItemEditComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.form.patchValue(data);
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.get('id')?.value == '0') {
      this.iService.create(this.form.value);
      this.dialogRef.close();
    } else {
      this.iService.update(this.form.getRawValue());
      this.dialogRef.close();
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
