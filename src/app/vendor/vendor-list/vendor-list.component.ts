import { Component } from '@angular/core';
import { Vendor } from '../vendor.class';
import { VendorService } from '../vendor.service';
import { SystemService } from 'src/app/core/system.service';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent {

  vendors: Vendor[] = [];
  pageTitle = "Vendor List";
  sortColumn: string = "id";
  sortAsc: boolean = true;

  constructor(
    private venSvc: VendorService,
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
    this.venSvc.list().subscribe({
      next: (res) =>{
        console.debug("Users Listed:", res);
        this.vendors = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

}
