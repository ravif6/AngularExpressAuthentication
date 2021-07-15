import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './register/register.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { LoginComponent } from './login/login.component';
import { RegularEventsComponent } from './regular-events/regular-events.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'events',component:RegularEventsComponent},
  {path:'login',component:LoginComponent},
  {path:'special',component:SpecialEventsComponent,canActivate:[AuthGuard]},
  {path:'register',component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
