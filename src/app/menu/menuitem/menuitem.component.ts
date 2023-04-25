import { Component } from '@angular/core';
import { Menu } from '../menu.class';

@Component({
  selector: 'app-menuitem',
  templateUrl: './menuitem.component.html',
  styleUrls: ['./menuitem.component.css']
})
export class MenuitemComponent {

  menus: Menu[] = [
    new Menu("Home", "/home"),
    new Menu("About", "/about")
  ]

}