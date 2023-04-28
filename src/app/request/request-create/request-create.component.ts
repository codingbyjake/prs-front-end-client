import { Component } from '@angular/core';
import { Request } from '../request.class';
import { User } from 'src/app/user/user.class';
import { RequestService } from '../request.service';
import { UserService } from 'src/app/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-create',
  templateUrl: './request-create.component.html',
  styleUrls: ['./request-create.component.css']
})
export class RequestCreateComponent {
  request: Request = new Request();
  users: User[] = [];
  pageTitle: string = "Create New Request";

  constructor(
    private reqSvc: RequestService,
    private usrSvc: UserService,
    private router: Router
  ){}

  save(): void{
    this.request.userId = Number(this.request.userId); // <<<<<<<<<<<<< Is this needed????
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
