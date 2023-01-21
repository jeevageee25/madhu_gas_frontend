import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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

  constructor(private confirmationService: ConfirmationService, private toastService: ToastService, private fb: FormBuilder, private PService: ProductsService) { }

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
  }

  searchOrders() {
    this.PService.getOrders({ search_key: {} }).subscribe((res: any) => {
      this.tableData = res?.data || []
    }, e => {
      this.toastService.showErrorToaster('Error', 'Something went wrong !. Please try again later.');
    })
  }

  editRow(row: any) {

  }

  deleteRow(row: any) {

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
}
