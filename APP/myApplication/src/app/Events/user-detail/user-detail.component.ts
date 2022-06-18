import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
back(): void {
  const url=this.router.url;
  
  const destinationUrl=url.substring(0, url.lastIndexOf('/'))
  this.router.navigate([destinationUrl]);
  console.log(destinationUrl);
 
}
}
