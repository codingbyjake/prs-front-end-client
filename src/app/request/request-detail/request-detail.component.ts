import { Component } from '@angular/core';
import { Request } from '../request.class';
import { RequestService } from '../request.service';
import { SystemService } from 'src/app/core/system.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-request-detail',
  templateUrl: './request-detail.component.html',
  styleUrls: ['./request-detail.component.css']
})
export class RequestDetailComponent {

  request!: Request;
  pageTitle: string = "Request Details";
  showVerifyRemove: boolean = false;

  constructor(
    private reqSvc: RequestService,
    private sysSvc: SystemService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  remove() {
    this.showVerifyRemove = !this.showVerifyRemove;
  }

  removeVerified(): void{
    this.reqSvc.remove(this.request.id).subscribe({
      next: (res) => {
        console.debug("Request Deleted!!"),
        this.router.navigateByUrl("/request/list")
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  ngOnInit(): void{
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

}
