import { Component } from '@angular/core';
import { User } from '../user.class';
import { UserService } from '../user.service';
import { SystemService } from 'src/app/core/system.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {
  user: User = new User(); 
  pageTitle = "Create New User";
  
  constructor(
    private usrSvc: UserService,
    private sysSvc: SystemService,
    private route: ActivatedRoute,
    private router: Router

  ){}
  
  save(){
    this.usrSvc.create(this.user).subscribe({
      next: (res) => {
        console.debug("User Created!!");
        this.router.navigateByUrl("/user/list");
      },
      error: (err) => {
        console.error(err);
      }
    })

  }

  ngOnInit(): void{

  }

}
