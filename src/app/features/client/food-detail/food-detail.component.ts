import { Component, Inject } from '@angular/core';
import { FoodType } from '../../../core/interfaces/food.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-food-detail',
  templateUrl: './food-detail.component.html',
  styleUrls: ['./food-detail.component.scss'],
})
export class FoodDetailComponent {
  constructor(
    public dialogRef: MatDialogRef<FoodDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FoodType
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
