import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatchComponent } from './match/match.component';


const appRoutes: Routes = [
  // { path: 'survey', component: SurveyFormComponent },
  {
    path: 'match',
    component: MatchComponent,
  },
  { path: '',
    redirectTo: '/match',
    pathMatch: 'full'
  }
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
