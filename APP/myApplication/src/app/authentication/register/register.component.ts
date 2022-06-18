import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private _auth:AuthService,private _route:Router) { }
  
  registerUserData={
    userName:"",
    password:""
  }

  ngOnInit(): void {
  }
 registerUser()
 {
   this._auth.registerUser(this.registerUserData)
   .subscribe(
     res=>{
      console.log(res)
      localStorage.setItem('token',res.id_token)
      this._route.navigate(['/special-events']);
    },
     err=>console.log(err)
)
}

}
