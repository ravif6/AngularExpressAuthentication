import { TokenInterceptorService } from './token-interceptor.service';
import { EventService } from './event.service';
import { AuthService } from './auth.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { RegularEventsComponent } from './regular-events/regular-events.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http'



import {SocialAuthServiceConfig} from 'angularx-social-login';
import {
  GoogleLoginProvider,SocialLoginModule
} from 'angularx-social-login';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    RegularEventsComponent,
    SpecialEventsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    SocialLoginModule
  ],
  providers: [AuthService,EventService,
  {
   provide:HTTP_INTERCEPTORS,useClass: TokenInterceptorService,multi:true
 },
 {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '748490838001-jhij0iprrvpd293fs4rt3pg37hijgj1t.apps.googleusercontent.com'
          )
        }   
      ]
    } as SocialAuthServiceConfig,
 }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
