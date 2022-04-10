import { EventService } from '../services/event.service';
import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { GetRegularEvents, GetRegularEvents2 } from '../store/actions/users.action';
import { RegularEventsState } from '../store/state/users.states';
import { Observable } from 'rxjs';

export class RegularEvent{
  userName: string ="";
  password: string ="";
}

@Component({
  selector: 'app-regular-events',
  templateUrl: './regular-events.component.html',
  styleUrls: ['./regular-events.component.scss']
})

export class RegularEventsComponent implements OnInit {

  events=[] as any
  @Select(RegularEventsState.getRegularEvents) events$!:Observable<RegularEvent[]>

  constructor(private _eventService:EventService,private store:Store) { }
 
  
  ngOnInit(): void {
     this.getRegularEvents();
    //  this.events$.subscribe(res => {
    //   console.log('res',res);
    //   this.events=res;
    //  })
   // this.getRegularEvents2();
  }

  getRegularEvents(){
    // console.log('hey.. im called first');
    this.store.dispatch(new GetRegularEvents());
  

  //   this._eventService.getEvents().subscribe(
  //     res=>this.events=res,
  //     err=>{
  //       alert("OOps some error occured, check console for more info");console.log(err)
  //     }
      
  //   )
   }

   getRegularEvents2(){
    console.log('get regular 222222');
    this.store.dispatch(new GetRegularEvents2());
   }

}
