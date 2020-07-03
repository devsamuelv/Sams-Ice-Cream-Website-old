import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { IcecreamComponent } from './components/icecream/icecream.component';
import { AdminComponent } from './components/admin/admin.component';


const routes: Routes = [
  { path:"", component: HomeComponent },
  { path:"icecream", component: IcecreamComponent },
  { path:"admin", component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
