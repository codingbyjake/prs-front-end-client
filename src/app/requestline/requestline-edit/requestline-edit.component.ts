import { Component } from '@angular/core';
import { Requestline } from '../requestline.class';
import { Product } from 'src/app/product/product.class';
import { RequestlineService } from '../requestline.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/product/product.service';

@Component({
  selector: 'app-requestline-edit',
  templateUrl: './requestline-edit.component.html',
  styleUrls: ['./requestline-edit.component.css']
})
export class RequestlineEditComponent {

  requestline!: Requestline;
  products!: Product[];
  pageTitle: string = "Edit Requestline";

  constructor(
    private rlineSvc: RequestlineService,
    private proSvc: ProductService,
    private route: ActivatedRoute
  ){}

  save(): void{
    // I'm wrting the save method for requestline-edit
  }

  ngOnInit(): void{
    let id = this.route.snapshot.params["id"];
    this.proSvc.list().subscribe({
      next: (res) => {
        console.debug("Users seen by the Request Componenttt", res);
        this.products = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
    this.rlineSvc.get(id).subscribe({
      next: (res) => {
        console.debug("Requesstt:", res);
        this.requestline = res;
      }
    })
  }

}
