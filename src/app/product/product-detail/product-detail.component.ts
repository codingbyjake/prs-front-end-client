import { Component } from '@angular/core';
import { Product } from '../product.class';
import { ProductService } from '../product.service';
import { SystemService } from 'src/app/core/system.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {

  product!: Product;
  pageTitle: string = "Product Details";
  showVerifyRemove: boolean = false;

  constructor(
    private proSvc: ProductService,
    private sysSvc: SystemService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  remove() {
    this.showVerifyRemove = !this.showVerifyRemove;
  }

  removeVerified(): void{
    this.proSvc.remove(this.product.id).subscribe({
      next: (res) => {
        console.debug("Product Deleted!!"),
        this.router.navigateByUrl("/product/list")
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  ngOnInit(): void{
    let id = +this.route.snapshot.params["id"];
    this.proSvc.get(id).subscribe({
      next: (res) =>{
        console.debug("Product Listed:", res);
        this.product = res;
        this.product.vendorName = this.product.vendor !== null ? this.product.vendor.name : "No Vendor";
      },
      error: (err) => {
        console.error(err);
      }
    })
  }  
}
