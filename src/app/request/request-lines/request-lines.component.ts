import { Component } from '@angular/core';
import { RequestService } from '../request.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Request } from '../request.class';


@Component({
  selector: 'app-request-lines',
  templateUrl: './request-lines.component.html',
  styleUrls: ['./request-lines.component.css']
})
export class RequestLinesComponent {

  request!: Request;
  // requestlines Requestline[] = [];
  pageTitle: string = "Request Lines";
  showVerifyRemove: boolean = false;

  constructor(
    private reqSvc: RequestService,
    private route: ActivatedRoute,
    private router: Router

  ){}

  review(): void{
    this.reqSvc.review(this.request).subscribe({
      next: (res) =>{
        console.debug("Request Revieweddd:", res)
        this.request = res;
        this.refresh();
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  refresh(): void{
    let id = +this.route.snapshot.params["id"];
    this.reqSvc.get(id).subscribe({
      next: (res) =>{
        console.debug("Requests Listed:", res);
        this.request = res;
        this.request.username = this.request.user !== null ? this.request.user.username : "No User";
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  ngOnInit(): void{
    this.refresh();
  } 

}