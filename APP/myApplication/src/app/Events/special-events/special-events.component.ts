import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.scss']
})
export class SpecialEventsComponent implements OnInit {
  constructor(private _eventService:EventService) { }
 
  specialEvents=[] as any
  
  ngOnInit(): void {
this._eventService.getSpecialEvents().subscribe(
  res=>this.specialEvents=res,
  err=>console.log(err) 
)}
}
