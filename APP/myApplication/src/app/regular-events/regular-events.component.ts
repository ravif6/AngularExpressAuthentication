import { EventService } from './../event.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-regular-events',
  templateUrl: './regular-events.component.html',
  styleUrls: ['./regular-events.component.scss']
})
export class RegularEventsComponent implements OnInit {

  constructor(private _eventService:EventService) { }
 
  events=[] as any


  ngOnInit(): void {
this._eventService.getEvents().subscribe(
  res=>this.events=res,
  err=>console.log(err)
  
)

  }

}
