import { Component } from '@angular/core';
import { User } from '../user.class';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent {

  user!: User;
  pageTitle = "Edit User";

  constructor(
    private usrSvc: UserService,
    private route: ActivatedRoute,
    private router: Router
  ){}

  save(){
    this.usrSvc.change(this.user.id, this.user).subscribe({
      next: (res) =>{
        console.debug("User changed to:", res);
        this.user = res;
        this.router.navigateByUrl("/user/list");
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  ngOnInit(): void{
    let id = +this.route.snapshot.params["id"];
    this.usrSvc.get(id).subscribe({
      next: (res) =>{
        console.debug("User to be Edited!:", res);
        this.user = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

}
