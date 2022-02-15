import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss'],
})
export class CategoryEditComponent implements OnInit {
  form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
  });

  constructor(
    private catService: CategoryService,
    private dialogRef: MatDialogRef<CategoryEditComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.form.patchValue(data);
  }

  ngOnInit(): void {
    this.catService.getAll();
  }

  onSubmit(): void {
    if (this.form.get('id').value == '') {
      this.catService.create(this.form.value);
      this.dialogRef.close();
    } else {
      this.catService.update(this.form.value);
      this.dialogRef.close();
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
