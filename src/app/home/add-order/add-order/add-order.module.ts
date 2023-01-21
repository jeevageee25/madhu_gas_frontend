import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddOrderComponent } from '../add-order.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'primeng/api';

const routes: Routes = [
  {
    path: '',
    component: AddOrderComponent
  }
]


@NgModule({
  declarations: [AddOrderComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class AddOrderModule { }
