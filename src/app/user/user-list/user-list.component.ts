import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { SystemService } from 'src/app/core/system.service';
import { User } from '../user.class';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  users: User[] = [];
  pageTitle = "User List";
  sortColumn: string = "id";
  sortAsc: boolean = true;

  constructor(
    private usrSvc: UserService,
    private sysSvc: SystemService
  ){}

  selectColumn(col: string): void{
    if(col === this.sortColumn){
      this.sortAsc = !this.sortAsc;
      return
    }
    this.sortAsc = true;
    this.sortColumn = col;
  }

  ngOnInit(): void{
    this.usrSvc.list().subscribe({
      next: (res) =>{
        console.debug("Users Listed:", res);
        this.users = res;
      },
      error: (err) => {
        console.error(err);
      }
    })

  }

}
