import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { FoodType } from '../../../../core/interfaces/food.model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-food-edit',
  templateUrl: './food-edit.component.html',
  styleUrls: ['./food-edit.component.scss'],
})
export class FoodEditComponent {
  // @ts-ignore
  form: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<FoodEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FoodType | null
  ) {
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      name: [this.data ? this.data.name : '', [Validators.required]],
      price: [this.data ? this.data.price : '', [Validators.required]],
    });
  }

  submit() {
    if (this.form.valid) {
      const data = {
        name: this.form.value.name,
        price: this.form.value.price,
        type: !this.data ? 'new' : 'edit',
      };
      this.dialogRef.close(data);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
