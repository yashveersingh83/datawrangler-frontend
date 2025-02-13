// shared.module.ts
import { NgIf, NgFor, CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DevExtremeModule } from 'devextreme-angular';

export const sharedModule = [
  
  FormsModule,ReactiveFormsModule,
  CommonModule,  DevExtremeModule 
];
