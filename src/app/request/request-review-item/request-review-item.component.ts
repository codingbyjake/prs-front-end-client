import { Component } from '@angular/core';
import { Request } from '../request.class';
import { RequestService } from '../request.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-request-review-item',
  templateUrl: './request-review-item.component.html',
  styleUrls: ['./request-review-item.component.css']
})
export class RequestReviewItemComponent {

  request!: Request;
  pageTitle: string = "Request Item Review";
  rejectClicked: boolean = false;

  constructor(
    private reqSvc: RequestService,
    private route: ActivatedRoute,
    private router: Router

  ){}

  approve(): void{
    this.reqSvc.approve(this.request).subscribe({
      next: (res) => {
        console.debug("Request Approved:")
        this.request = res;
        this.refresh();
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  reject(): void{
    this.rejectClicked = !this.rejectClicked;
  }

  rejectConfirmed(): void{
    this.reqSvc.reject(this.request).subscribe({
      next: (res) => {
        console.debug("Request Rejectedd:")
        this.request = res;
        this.rejectClicked = !this.rejectClicked;
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
