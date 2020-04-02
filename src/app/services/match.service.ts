import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map, catchError  } from "rxjs/operators"; 


@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(
    private http: Http
  ) {
    
   }

  public getMatches(): Observable<any> {

    return this.http.get("../../assets/matches.json")
                    .pipe(map((res:any) => res.json()));

  }
}
