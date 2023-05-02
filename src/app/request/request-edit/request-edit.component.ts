import { Component } from '@angular/core';
import { Request } from '../request.class';
import { User } from 'src/app/user/user.class';
import { RequestService } from '../request.service';
import { SystemService } from 'src/app/core/system.service';
import { UserService } from 'src/app/user/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-request-edit',
  templateUrl: './request-edit.component.html',
  styleUrls: ['./request-edit.component.css']
})
export class RequestEditComponent {

  request!: Request;
  users: User[] = [];
  pageTitle: string = "Edit Request"
  


  constructor(
    private reqSvc: RequestService,
    private usrSvc: UserService,
    private sysSvc: SystemService,
    private router: Router,
    private route: ActivatedRoute

  ){}

  save(): void{
    this.reqSvc.change(this.request.id, this .request).subscribe({
      next: (res) => {
        console.debug("Request changed to:", res);
        // this.request = res;
        this.router.navigateByUrl("/request/list");
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  ngOnInit(): void{
    let id = this.route.snapshot.params["id"];
    this.reqSvc.get(id).subscribe({
      next: (res) => {
        console.debug("Requesstt:", res);
        this.request = res;
        this.request.username = this.request.user !== null ? this.request.user.username : "No User";
      },
      error: (err) => {
        console.error(err);
      }
    })
  }


}
