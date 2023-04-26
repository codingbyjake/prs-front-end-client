import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { SystemService } from 'src/app/core/system.service';
import { User } from '../user.class';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent {

  user!: User; 
  pageTitle = "User Details";
  showVerifyRemove: boolean = false;

  constructor(
    private usrSvc: UserService,
    private sysSvc: SystemService,
    private route: ActivatedRoute,
    private router: Router

  ){}
  remove() {
    this.showVerifyRemove = !this.showVerifyRemove;
  }

  removeVerified(): void{
    this.usrSvc.remove(this.user.id).subscribe({
      next: (res) => {
        console.debug("Users Deleted!!"),
        this.router.navigateByUrl("/user/list")
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  ngOnInit(): void{
    let id = +this.route.snapshot.params["id"];
    this.usrSvc.get(id).subscribe({
      next: (res) =>{
        console.debug("Users Listed:", res);
        this.user = res;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

}
