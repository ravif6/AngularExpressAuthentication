import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {Router} from '@angular/router'
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  subscription!:Subscription
  private _registerUrl ="http://localhost:5000/api/register";
  private _loginUrl ="http://localhost:5000/api/login";
  private _socialLoginUrl ="http://localhost:5000/api/social-login";

  constructor(private http:HttpClient,private _router:Router,private socialAuthService: SocialAuthService) { }
 

  registerUser(user:any) :Observable<any>
  {
    return this.http.post<any>(this._registerUrl,user)
  }

  socialLogin(token:any) :Observable<any>
  {
    return this.http.post<any>(this._socialLoginUrl ,token)
  }

  loginUser(user:any) :Observable<any>
  {
    return this.http.post<any>(this._loginUrl,user)
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }
  getToken()
  {
    return localStorage.getItem('token')
  }
  logoutUser()
  {
    localStorage.removeItem('token');
    this.socialAuthService.signOut();
    this._router.navigate(['/events']);
  }




  socialUser!: SocialUser;
  isLoggedin: boolean=false; 
  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);

    //After sociallogin getting user details of user from google
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = (user != null);
      console.log(this.socialUser);  
       
      //post request for /social-login
     this.subscription=this.socialLogin(this.socialUser)
   .subscribe(
      res=>{
       console.log("response from server is --->",res)
       localStorage.setItem('token',res.id_token)
       this._router.navigate(['/special']);
      },
      err=>console.log(err),
    ) 
    });
}

  logOut(): void {
    this.socialAuthService.signOut();
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
