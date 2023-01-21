import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { ConfirmationService } from 'primeng/api';
import { ProductsService } from 'src/app/services/products.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})
export class AddOrderComponent implements OnInit {

  inputForm: FormGroup = new FormGroup({});
  categories: any = ['Domestic', 'Commercial'];
  configuration: Config = { ...DefaultConfig };
  columns: Columns[] = [];
  tableData = [];
  products = [];

  constructor(private confirmationService: ConfirmationService, private toastService: ToastService, private fb: FormBuilder, private PService: ProductsService) { }

  ngOnInit(): void {
    this.createForm();
    this.searchProducts();
  }

  createForm() {
    this.inputForm = this.fb.group({
      _id: [],
      category: ['', Validators.required],
      product: ['', Validators.required],
      count: ['', Validators.required],
      expected_delivery: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      address1: ['', Validators.required],
      address2: ['', Validators.required],
      pincode: ['', Validators.required],
      phone: ['', Validators.required],
    })
  }

  addOrder() {
    if (this.inputForm.invalid) {
      this.toastService.showWarningToaster('Warning', 'Please fill all the Mandatory Fields !');
      this.inputForm.markAllAsTouched();
      return;
    }
    const data = { ...this.inputForm.value };
    delete data._id;
    this.PService.addOrder(data).subscribe((res: any) => {
      this.toastService.showSuccessToaster('Success', 'Added Successfully !');
      this.inputForm.reset();
    }, e => {
      this.toastService.showErrorToaster('Error', 'Something went wrong !. Please try again later.');
    })
  }

  updateProduct() {
    if (this.inputForm.invalid) {
      this.toastService.showWarningToaster('Warning', 'Please fill all the Mandatory Fields !');
      this.inputForm.markAllAsTouched();
      return;
    }
    this.PService.updateProducts(this.inputForm.value).subscribe((res: any) => {
      this.toastService.showSuccessToaster('Success', 'Updated Successfully !');
      this.inputForm.reset();
    }, e => {
      this.toastService.showErrorToaster('Error', 'Something went wrong !. Please try again later.');
    })
  }

  searchProducts() {
    this.PService.getProducts({ search_key: {} }).subscribe((res: any) => {
      this.products = res?.data || []
    }, e => {
      this.toastService.showErrorToaster('Error', 'Something went wrong !. Please try again later.');
    })
  }

  get Products() {
    const { category } = this.inputForm.value;
    let data = category && this.products && this.products.filter((p: any) => p.category === category) || [];
    return data.map((d: any) => d.name)
  }

}
