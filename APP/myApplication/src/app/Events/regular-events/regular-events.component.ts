import { EventService } from '../../services/event.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { GetRegularEvents } from '../../store/actions/users.action';
import { RegularEventsState } from '../../store/state/users.states';
import { Observable, Subscription } from 'rxjs';

export class RegularEvent{
  title: string ="";
  text: string ="";
}

@Component({
  selector: 'app-regular-events',
  templateUrl: './regular-events.component.html',
  styleUrls: ['./regular-events.component.scss']
})

export class RegularEventsComponent implements OnInit,OnDestroy {

  events=[] as any
  mysub!:Subscription;
  @Select(RegularEventsState.getRegularEvents) events$!:Observable<RegularEvent[]>

  constructor(private _eventService:EventService,private store:Store) { }
 
  
  ngOnInit(): void {
     this.getRegularEvents();
     this.mysub=this.events$.subscribe(res => {
      console.log('res',res);
      this.events=res;
     });
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

   ngOnDestroy(){
     this.mysub.unsubscribe();
   }

 

}
