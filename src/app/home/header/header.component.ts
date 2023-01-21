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
        { name: "View Orders", link: ['home', 'view-order'], icon: "pi pi-database" },
      ];
    }
    else {
      this.pages = [
        { name: "Order", link: ['home', 'products'], icon: "pi pi-database" },
        { name: "Order List", link: ['home', 'products'], icon: "pi pi-database" },
      ];
    }
    const session: any = sessionStorage.getItem('previledge');
    const previlege: any = JSON.parse(session);
    const data = previlege?.filter((v: any) => v.view);
    const views = data.map((v: any) => v.screen);
    this.pages = this.pages.filter((p: any) => views.includes(p.name));
    if (this.pages.length === 0) {
      sessionStorage.clear();
      this.ts.showWarningToaster('Warning', 'No Previledges given. Please contact administrator');
      this.router.navigate(['login']);
    }
    else {
      this.router.navigate([this.pages[0].link.join('/')])
    }
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
