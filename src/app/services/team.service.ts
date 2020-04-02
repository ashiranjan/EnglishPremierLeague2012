import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(
    private http: Http
  ) { }

  public getTeams(): Observable<any> {

    return this.http.get("../../assets/teams.json")
                    .pipe(map((res:any) => res.json()));

  }
}
