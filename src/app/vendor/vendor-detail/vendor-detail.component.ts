import { Component } from '@angular/core';
import { Vendor } from '../vendor.class';
import { VendorService } from '../vendor.service';
import { SystemService } from 'src/app/core/system.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vendor-detail',
  templateUrl: './vendor-detail.component.html',
  styleUrls: ['./vendor-detail.component.css']
})
export class VendorDetailComponent {

  vendor!: Vendor;
  pageTitle: string = "Vendor Details";
  showVerifyRemove: boolean = false;

  constructor(
    private venSvc: VendorService,
    private sysSvc: SystemService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  remove() {
    this.showVerifyRemove = !this.showVerifyRemove;
  }

  removeVerified(): void{
    this.venSvc.remove(this.vendor.id).subscribe({
      next: (res) => {
        console.debug("Vendor Deleted!!"),
        this.router.navigateByUrl("/vendor/list")
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  ngOnInit(): void{
    let id = +this.route.snapshot.params["id"];
    this.venSvc.get(id).subscribe({
      next: (res) =>{
        console.debug("Vendor Listed:", res);
        this.vendor = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }


}
