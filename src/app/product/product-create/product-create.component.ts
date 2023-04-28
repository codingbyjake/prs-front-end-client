import { Component } from '@angular/core';
import { Product } from '../product.class';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { VendorService } from 'src/app/vendor/vendor.service';
import { Vendor } from 'src/app/vendor/vendor.class';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {
  product: Product = new Product();
  vendors: Vendor[] = [];
  pageTitle: string = "Create New Product";

  constructor(
    private proSvc: ProductService,
    private venSvc: VendorService,
    private router: Router
  ){}

  save(): void{
    this.product.vendorId = +this.product.vendorId;
    this.proSvc.create(this.product).subscribe({
      next: (res) => {
        console.debug("Product Created");
        this.router.navigateByUrl("/product/list");
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
  ngOnInit(): void{
    this.venSvc.list().subscribe({
      next: (res) => {
        console.debug("Vendors seen by the Product Componenttt", res);
        this.vendors = res;
      },
      error: (err) => {
        console.error(err);
      }

    })
  }
}
