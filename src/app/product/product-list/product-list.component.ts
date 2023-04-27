import { Component } from '@angular/core';
import { Product } from '../product.class';
import { ProductService } from '../product.service';
import { SystemService } from 'src/app/core/system.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {

  products: Product[] = [];
  pageTitle = "Product List";
  sortColumn: string = "id";
  sortAsc: boolean = true;

  constructor(
    private proSvc: ProductService,
    private sysSvc: SystemService
  ){}

  selectColumn(col: string): void{
    if(col === this.sortColumn){
      this.sortAsc = !this.sortAsc;
      return
    }
    this.sortAsc = true;
    this.sortColumn = col;
  }

  ngOnInit(): void{
    this.proSvc.list().subscribe({
      next: (res) =>{
        console.debug("Products Listed:", res);
        this.products = res;
        for(let p of this.products){
          p.vendorName = p.vendor !== null ? p.vendor.name : "No Vendor";
        }
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

}
