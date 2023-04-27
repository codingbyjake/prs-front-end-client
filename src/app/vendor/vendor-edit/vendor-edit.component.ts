import { Component } from '@angular/core';
import { Vendor } from '../vendor.class';
import { VendorService } from '../vendor.service';
import { SystemService } from 'src/app/core/system.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-vendor-edit',
  templateUrl: './vendor-edit.component.html',
  styleUrls: ['./vendor-edit.component.css']
})
export class VendorEditComponent {

  vendor!: Vendor;
  pageTitle: string = "Vendor Edit";

  constructor(
    private venSvc: VendorService,
    private sysSvc: SystemService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  save(){
    this.venSvc.change(this.vendor.id, this.vendor).subscribe({
      next: (res) =>{
        console.debug("Vendor changed to:", res);
        this.vendor = res;
        this.router.navigateByUrl("/vendor/list");
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
  
  ngOnInit(): void{
    let id = +this.route.snapshot.params["id"];
    this.venSvc.get(id).subscribe({
      next: (res) =>{
        console.debug("Vendor to be Edited!:", res);
        this.vendor = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }


}
