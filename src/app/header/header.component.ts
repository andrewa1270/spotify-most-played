import { Component } from '@angular/core';
import { RetrieveTopSongsService } from '../services/retrieve-top-songs.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private retrieveTopSongsService: RetrieveTopSongsService){

  }
  public pieClick(){
    const routePath = "pie-chart"
    console.log("pie click")
  }
  public lastMonthClick(): Observable<any>{
    console.log("last month click")
    return this.retrieveTopSongsService.getTopSongs('short_term')
  }
  public sixMonthClick(){
    const routePath = "last-six-months"
    console.log("last 6 months")
  }
  public lastYearClick(){
    const routePath = "last-year"
    console.log("last year")
  }
}
