import { AuthService } from './services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

constructor(private _authService:AuthService,private _router:Router){

}
  canActivate():boolean
  {
    if(this._authService.loggedIn())

  return true;
  else
  {
    this._router.navigate(['/login']);
    console.log("arey raghuram i'm auth gaurd, nuvvu login kaale dhantla token led, login kaa")
    return false
  }
  }
  
}
