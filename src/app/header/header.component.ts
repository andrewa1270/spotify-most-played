import { Component } from '@angular/core';
import { RetrieveTopSongsService } from '../services/retrieve-top-songs.service'
import { Observable } from 'rxjs';
import { CLIENT_ID, REDIRECT_URI, SCOPE } from 'src/details';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private retrieveTopSongsService: RetrieveTopSongsService, private route: ActivatedRoute, private apiService:ApiService){

  }
  public loginClick() {
    // Trigger Spotify OAuth flow
    window.location.href = (`https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`)
  }

  public pieClick(){
    const routePath = "pie-chart"
    console.log("pie click")
    this.apiService.getAccessToken()
  }
  public lastMonthClick(): string{
    return this.apiService.getCode();
    // return this.retrieveTopSongsService.getTopSongs('short_term')
    // console.log(this.retrieveTopSongsService.getSessionToken().subscribe(token => console.log(token)))
    // return this.retrieveTopSongsService.getTopSongs('short_term')
  }
  public sixMonthClick(){
    this.apiService.getAccessToken()
  }
  public lastYearClick(){
    this.apiService.accessToken()
  }
}
