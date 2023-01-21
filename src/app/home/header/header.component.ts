import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  pages: any = []

  constructor(private router: Router, private ts: ToastService) { }

  ngOnInit(): void {
    this.initPages();
  }

  initPages() {
    if (sessionStorage.getItem('role') === "admin") {
      this.pages = [
        { name: "Products", link: ['home', 'products'], icon: "pi pi-database" },
        { name: "Orders", link: ['home', 'create-order'], icon: "pi pi-database" },
        { name: "Booked Orders", link: ['home', 'view-order'], icon: "pi pi-database" },
      ];
    }
    else {
      this.pages = [
        { name: "Orders", link: ['home', 'create-order'], icon: "pi pi-database" },
        { name: "Booked Orders", link: ['home', 'view-order'], icon: "pi pi-database" },
      ];
    }
     
      // this.router.navigate([this.pages[0].link.join('/')])
  }

  handleChange(event: any) {
    const index = event.index;
    this.router.navigate(this.pages[index].link);
  }

  onLogout() {
    sessionStorage.clear();
    this.ts.showSuccessToaster('', 'Successfully Logged out');
    this.router.navigate(['/login']);
  }
}
