import { Component } from '@angular/core';
import { Requestline } from '../requestline.class';
import { RequestService } from 'src/app/request/request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/product/product.service';
import { Product } from 'src/app/product/product.class';
import { RequestlineService } from '../requestline.service';

@Component({
  selector: 'app-requestline-create',
  templateUrl: './requestline-create.component.html',
  styleUrls: ['./requestline-create.component.css']
})
export class RequestlineCreateComponent {

  requestline: Requestline = new Requestline();
  products!: Product[];
  pageTitle: string = "Create New Requestline"

  constructor(
    private reqSvc: RequestService,
    private proSvc: ProductService,
    private rlineSvc: RequestlineService,
    private router: Router,
    private route: ActivatedRoute
  ){}

  save(): void{
    this.requestline.requestId = +this.route.snapshot.params["id"];
    this.requestline.productId = +this.requestline.productId;
    console.debug("Requestline right before create method", this.requestline)
    this.rlineSvc.create(this.requestline).subscribe({
      next: (res) => {
        console.debug("Requestline Created");
        this.router.navigateByUrl(`/request/lines/${this.requestline.requestId}`);
      },
      error: (err) => {
        console.error(err);
      }
    })

  }

  ngOnInit(): void{
    this.proSvc.list().subscribe({
      next: (res) => {
        console.debug("Vendors seen by the Product Componenttt", res);
        this.products = res;
      },
      error: (err) => {
        console.error(err);
      }

    })
  } 
}
