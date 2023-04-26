import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { AboutComponent } from './core/about/about.component';
import { E404Component } from './core/e404/e404.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';

const routes: Routes = [
 { path: "", redirectTo: "/home", pathMatch: "full"},

 { path: "home", component: HomeComponent },
 { path: "about", component: AboutComponent },
 { path: "user/list", component: UserListComponent},
 { path: "user/detail/:id", component: UserDetailComponent},

 { path: "**", component: E404Component}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
