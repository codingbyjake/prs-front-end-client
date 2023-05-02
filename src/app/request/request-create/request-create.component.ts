import { Component } from '@angular/core';
import { Request } from '../request.class';
import { User } from 'src/app/user/user.class';
import { RequestService } from '../request.service';
import { UserService } from 'src/app/user/user.service';
import { Router } from '@angular/router';
import { SystemService } from 'src/app/core/system.service';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent {
  request: Request = new Request();
  users: User[] = [];
  pageTitle: string = "Create New Request";
  currentUserName: string = this.sysSvc.loggedInUser === null ? "No User, Please Login" : this.sysSvc.loggedInUser.username;
  currentUserId: number = this.sysSvc.loggedInUser === null ? 0 : this.sysSvc.loggedInUser.id;

  constructor(
    private reqSvc: RequestService,
    private usrSvc: UserService,
    private router: Router,
    private sysSvc: SystemService
  ){}

  save(): void{
    this.request.userId = this.currentUserId; 
    console.debug("Request at start of save()", this.request)
    this.reqSvc.create(this.request).subscribe({
      next: (res) => {
        console.debug("Request Created");
        this.router.navigateByUrl("/request/list");
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
  ngOnInit(): void{
    this.usrSvc.list().subscribe({
      next: (res) => {
        console.debug("Users seen by the Request Componenttt", res);
        this.users = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

}
