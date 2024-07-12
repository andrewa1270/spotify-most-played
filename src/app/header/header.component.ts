import { Component } from '@angular/core';
import { RetrieveTopSongsService } from '../services/retrieve-top-songs.service'
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { CLIENT_ID, REDIRECT_URI, SCOPE } from 'src/spotify-variables';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private isTokenRetrieved: boolean = false; // Checks if access token acquired yet

  constructor(private retrieveTopSongsService: RetrieveTopSongsService, private route: ActivatedRoute, private apiService:ApiService){}

  public loginClick() {
    // Trigger Spotify OAuth flow
    window.location.href = (`https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`);
  }

  public pieClick(){
    // if (!this.isTokenRetrieved){      
    //   this.apiService.getAccessToken()
    //   this.isTokenRetrieved = true
    // }
    console.log('no functionality')
    
    // this.apiService.getAccessToken()
  }
  public lastMonthClick(){
    const x = this.apiService.getTopTracks('short_term')
    console.log(x)
  }
  public sixMonthClick(){
    this.apiService.getTopTracks('medium_term')
  }
  
  public lastYearClick(){
    this.apiService.getTopTracks('long_term')
  }
}
