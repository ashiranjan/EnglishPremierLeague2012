import { Component, OnInit } from '@angular/core';
import { MatchService } from '../services/match.service';
import { TeamService } from '../services/team.service';


@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.scss']
})
export class MatchComponent implements OnInit {

  constructor(
    private matchService: MatchService,
    private teamService: TeamService
  ) { 
    
  }
  matchData : any;
  teamData: any;
  clubs: any[] = [];
  rounds: any[] = [];
  matches: any[] = [];
  tableData = [];

  ngOnInit() {

    this.teamService.getTeams()
    .subscribe(team=> {
      if(team)
      this.teamData = team;
      this.clubs = this.teamData.clubs;
     });


    this.matchService.getMatches()
    .subscribe(match=> {
      if(match)
      this.matchData = match;
      this.rounds = this.matchData.rounds;
      this.rounds.forEach(round =>{
        round.matches.forEach(match => {
          this.matches.push(match);
        })
      })
      this.map();
     } );

  }

  map(){
    let matchlength = 0;
   
    for(let i =0 ; i < this.clubs.length ; i++){
      let scoreFor = 0;
      let scoreAgainst = 0;
      let noOfTie = 0;
      let noOfWon = 0;
      let noOfLost = 0;

      matchlength = this.matches.filter(c => c.team1.code == this.clubs[i].code || c.team2.code == this.clubs[i].code).length;
      
      
      for(let j = 0; j < this.matches.length; j++){
        if(this.matches[j].team1.code == this.clubs[i].code){
          scoreFor += this.matches[j].score1;
          scoreAgainst += this.matches[j].score2;
          noOfTie += this.matches[j].score1 == this.matches[j].score2 ? 1 : 0;
          noOfWon += this.matches[j].score1 > this.matches[j].score2 ? 1 : 0;
          noOfLost += this.matches[j].score1 < this.matches[j].score2 ? 1 : 0;
        }
        if(this.matches[j].team2.code == this.clubs[i].code){
          scoreFor += this.matches[j].score2;
          scoreAgainst += this.matches[j].score1;
          noOfTie += this.matches[j].score1 == this.matches[j].score2 ? 1 : 0;
          noOfWon += this.matches[j].score1 < this.matches[j].score2 ? 1 : 0;
          noOfLost += this.matches[j].score1 > this.matches[j].score2 ? 1 : 0;
        }

      }
     
      if(this.clubs[i].code){
        let cuurentMatch = {
          teamName: this.clubs[i].code, 
          totalmatches: matchlength,
          totalScoreFor: scoreFor,
          totalScoreAgainst : scoreAgainst,
          totalTies: noOfTie,
          totalWon: noOfWon,
          totalLost: noOfLost
        }
        this.tableData.push(cuurentMatch);
      }
      
      this.tableData = [...this.tableData];
    }
  }

}
