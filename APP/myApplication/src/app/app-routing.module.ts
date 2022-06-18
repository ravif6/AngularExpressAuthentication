import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './authentication/register/register.component';
import { SpecialEventsComponent } from './Events/special-events/special-events.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegularEventsComponent } from './Events/regular-events/regular-events.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from './Events/user-detail/user-detail.component';

const routes: Routes = [
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'regular-events',component:RegularEventsComponent},
  {path:'special-events',component:SpecialEventsComponent,canActivate:[AuthGuard]},
  {path:'special-events/user-details',component:UserDetailComponent},
  {path:'regular-events/user-details',component:UserDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
