import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { EventService } from "src/app/services/event.service";
import { GetRegularEvents, GetRegularEvents2 } from "../actions/users.action";
import {tap} from "rxjs/operators";


//StateModel
export class RegularEventsModel{
    RegularEvents:any
}


//State
@State<RegularEventsModel>({
    name:'RegularEvents',
    defaults:{
          RegularEvents:[]
    }
})

@Injectable()
export class RegularEventsState{
    constructor (private eventService:EventService){}
//Selectors has the logic to get state data

//get regular events from state
    @Selector()
     static getRegularEvents(state:RegularEventsModel){
                return state.RegularEvents;
     }

     @Action(GetRegularEvents)
     getRegularEvents({getState,setState}:StateContext<RegularEventsModel>) {
        const state =getState();
        console.log('hi i\'m state Action---1');

  return this.eventService.getEvents().pipe(tap((result) =>{
    
    setState({
        ...state,
        RegularEvents:result
    });
}));
     }

     @Action(GetRegularEvents2)
     getRegularEvents2({}){
         console.log('hi i\'m state Action------2');
     }
}

