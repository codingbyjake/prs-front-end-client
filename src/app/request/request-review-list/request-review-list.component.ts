import { Component } from '@angular/core';
import { Request } from '../request.class';
import { RequestService } from '../request.service';
import { SystemService } from 'src/app/core/system.service';

@Component({
  selector: 'app-request-review-list',
  templateUrl: './request-review-list.component.html',
  styleUrls: ['./request-review-list.component.css']
})
export class RequestReviewListComponent {

  requests: Request[] = [];
  pageTitle = "Requests Under Review";
  sortColumn: string = "id";
  sortAsc: boolean = true;
  loggedInUserId!: number;

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
    console.debug("logged in user:", this.sysSvc.loggedInUser)
    if(this.sysSvc.loggedInUser === null){
      this.loggedInUserId = 0;
    }else{
      this.loggedInUserId = this.sysSvc.loggedInUser.id;
    }
  this.reqSvc.requests(this.loggedInUserId).subscribe({
    next: (res) =>{
      console.debug("Requests Listed:", res);
      this.requests = res;
      for(let r of this.requests){
        r.username = r.user === null ? "No User" : r.user.username;
      }
    },
    error: (err) => {
      console.error(err);
    }
  })
}

}
