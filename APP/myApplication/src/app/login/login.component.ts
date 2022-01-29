import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {Router} from '@angular/router'
import { FormBuilder,} from '@angular/forms';
import { SocialAuthService, } from 'angularx-social-login';
import { NotificationService } from '../services/notification.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

 
  constructor(public _auth:AuthService,private _router:Router,private _notification:NotificationService) { }
  loginUserData={
    userName:"",
    password:""
  }
  loginUser()
  {
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res=>{
        console.log(res)
        this._notification.showNotification("login successful","ok","success")
        localStorage.setItem('token',res.token)
        this._router.navigate(['/special-events']);
      },
      err=>{
        this._notification.showNotification(err.error,"ok","error")
      },
    )
  }
    ngOnInit() {   
      
    }
  
   
}


