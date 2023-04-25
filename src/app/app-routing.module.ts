import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { AboutComponent } from './core/about/about.component';

const routes: Routes = [
 { path: "", redirectTo: "/core/home", pathMatch: "full"},

 { path: "core/home", component: HomeComponent },
 { path: "core/about", component: AboutComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
