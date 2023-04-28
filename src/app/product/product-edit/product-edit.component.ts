import { Component } from '@angular/core';
import { Product } from '../product.class';
import { ProductService } from '../product.service';
import { VendorService } from 'src/app/vendor/vendor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Vendor } from 'src/app/vendor/vendor.class';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent {

  product!: Product;
  vendors: Vendor[] = [];
  pageTitle: string = "Product Edit";

  constructor(
    private proSvc: ProductService,
    private venSvc: VendorService,
    private router: Router,
    private route: ActivatedRoute

  ){}

  save(): void{
    // this.product.vendorId = +this.product.vendorId;   <<<<<<<<<<< Not Needed Apparently
    this.proSvc.change(this.product.id, this.product).subscribe({
      next: (res) =>{
        console.debug("Product changed to:", res);
        this.product = res;
        this.router.navigateByUrl("/product/list");
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  ngOnInit(): void{
    let id = this.route.snapshot.params["id"];
    this.venSvc.list().subscribe({
      next: (res) => {
        console.debug("Vendors seen by the Product Componenttt", res);
        this.vendors = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
    this.proSvc.get(id).subscribe({
      next: (res) => {
        console.debug("Producttt:", res);
        this.product = res;
      }
    })
  }

}
