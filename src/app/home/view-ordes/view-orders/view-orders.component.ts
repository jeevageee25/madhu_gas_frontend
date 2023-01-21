import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Config, DefaultConfig, Columns } from 'ngx-easy-table';
import { ConfirmationService } from 'primeng/api';
import { ProductsService } from 'src/app/services/products.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-view-orders',
  templateUrl: './view-orders.component.html',
  styleUrls: ['./view-orders.component.scss']
})
export class ViewOrdersComponent implements OnInit {
  configuration: Config = { ...DefaultConfig };
  columns: Columns[] = [];
  tableData = [];

  constructor(private router: Router, private confirmationService: ConfirmationService, private toastService: ToastService, private fb: FormBuilder, private PService: ProductsService) { }

  ngOnInit(): void {
    this.initTable();
    this.searchOrders();
  }

  initTable() {
    this.configuration = { ...DefaultConfig };
    this.configuration.rows = 10;
    this.columns = [
      { key: 'category', title: 'Category' },
      { key: 'name', title: 'Product' },
      { key: 'count', title: 'Count' },
      { key: 'expected_delivery_date', title: 'Expected Delivery Date' },
      { key: 'contact_person', title: 'Contact Person' },
      { key: 'mobile', title: 'Phone' },
      { key: 'address', title: 'Address' },
      { key: '', title: 'Actions' }
    ];

    const role = sessionStorage.getItem('role');
    if (role !== 'customer') {
      this.columns.unshift({ key: 'user_name', title: 'User Name' },)
    }
  }

  searchOrders() {
    const user: any = sessionStorage.getItem('user_info');
    const user_name = JSON.parse(user).user_name
    let payload: any = { search_key: {} };
    const role = sessionStorage.getItem('role');
    if (role === 'customer') {
      payload.search_key = { user_name: user_name }
    }
    this.PService.getOrders(payload).subscribe((res: any) => {
      this.tableData = res?.data || []
    }, e => {
      this.toastService.showErrorToaster('Error', 'Something went wrong !. Please try again later.');
    })
  }

  editRow(row: any) {
    sessionStorage.setItem('orders', JSON.stringify(row))
    this.router.navigate(['/create-order'])
  }

  deleteRow(row: any) {
    this.PService.deleteOrders(row._id).subscribe((res: any) => {
      this.toastService.showSuccessToaster('Success', 'Deleted Successfully !');
      this.searchOrders();
    }, e => {
      this.toastService.showErrorToaster('Error', 'Something went wrong !. Please try again later.');
    })
  }


  confirm(event: Event, row: any) {
    const target: any = event.target;
    this.confirmationService.confirm({
      target,
      message: "Are you sure that you want to proceed?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.deleteRow(row);
      },
      reject: () => {

      }
    });
  }

  get role() {
    return sessionStorage.getItem('role')
  }
}
