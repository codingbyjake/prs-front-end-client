import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { SystemService } from 'src/app/core/system.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {

  pageTitle = "User Login"
  loginMessage: string = "Please Log In";
  username = "";
  password = "";

  constructor(
    private usrSvc: UserService,
    private sysSvc: SystemService,
    private router: Router
  ){}

  login(){
    this.usrSvc.login(this.username, this.password).subscribe({
      next: (res) => {
        console.debug("Login Success!!", res);
        this.sysSvc.loggedInUser = res;
        console.debug("logged in user:", this.sysSvc.loggedInUser)
        this.router.navigateByUrl("/request/list");
      },
      error: (err) => {
        console.error(err);
        this.loginMessage = "Login failed. Please try again."
      }
    })
  }
  ngOnInit(): void{
    this.sysSvc.loggedInUser = null;
  }

}
