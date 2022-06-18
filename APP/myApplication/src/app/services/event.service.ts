import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventService {


  private _enentsUrl="http://localhost:5000/events/regular";
  private _specialEventsUrl = "http://localhost:5000/events/special"
  constructor(private http:HttpClient) { }

  getEvents():Observable<any>
  {
    return this.http.get<any>(this._enentsUrl)
  }
  getSpecialEvents():Observable<any>
  {
    return this.http.get<any>(this._specialEventsUrl)
  }
}
