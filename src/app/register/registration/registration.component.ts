import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  inputForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private ps: ProductsService, private toast: ToastService, private router: Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.inputForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      user_name: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required],
    })
  }


  addEmployee() {
    if (this.inputForm.invalid) {
      this.toast.showWarningToaster('Warning', 'Please fill all the fields');
      return
    }
    this.ps.addEmployee({ ...this.inputForm.value, previledges: ['customer'] }).subscribe(res => {
      this.toast.showWarningToaster('Success', 'Successfully Registered');
      this.router.navigate(['/login'])
    })

  }

  onloginclick(){
    this.router.navigate(['/login'])
  }

}
