import { Component } from '@angular/core';
import { Request } from '../request.class';
import { RequestService } from '../request.service';
import { SystemService } from 'src/app/core/system.service';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent {

  requests: Request[] = [];
  pageTitle = "Request List";
  sortColumn: string = "id";
  sortAsc: boolean = true;

  constructor(
    private reqSvc: RequestService,
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
    this.reqSvc.list().subscribe({
      next: (res) =>{
        console.debug("Requests Listed:", res);
        this.requests = res;
        for(let r of this.requests){
          r.username = r.user !== null ? r.user.username : "No User";
        }
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

}
