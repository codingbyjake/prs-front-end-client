import { Component } from '@angular/core';
import { Menu } from '../menu.class';
import { SystemService } from 'src/app/core/system.service';

@Component({
  selector: 'app-menuitem',
  templateUrl: './menuitem.component.html',
  styleUrls: ['./menuitem.component.css']
})
export class MenuitemComponent {

  currentUser: string = this.sysSvc.loggedInUser === null ? "No User" : this.sysSvc.loggedInUser.username
  
  menus: Menu[] = [
    new Menu("Home", "/home"),
    new Menu("About", "/about"),
    new Menu("Users", "/user/list"),
    new Menu("Vendors", "/vendor/list"),
    new Menu("Products", "/product/list"),
    new Menu("Requests", "/request/list"),
    new Menu("Requests under Review", "/request/review-list"),
    new Menu("Login", "/user/login"),
  ]
  
  constructor(
    private sysSvc: SystemService
  ){}

}
