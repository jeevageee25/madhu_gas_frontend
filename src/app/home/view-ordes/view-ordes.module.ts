import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ViewOrdersComponent
  }
]


@NgModule({
  declarations: [
    ViewOrdersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ViewOrdesModule { }
