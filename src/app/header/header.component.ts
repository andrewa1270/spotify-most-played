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
  private isTokenRetrieved: boolean = false; // Checks if access token acquired yet

  constructor(private retrieveTopSongsService: RetrieveTopSongsService, private route: ActivatedRoute, private apiService:ApiService){}

  public loginClick() {
    // Trigger Spotify OAuth flow
    window.location.href = (`https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`);
  }

  public async pieClick(){
    if (!this.isTokenRetrieved){      
      await this.apiService.getAccessToken()
      this.isTokenRetrieved = true
    }
    this.apiService.accessToken()
  }
  public async lastMonthClick(){
    if (!this.isTokenRetrieved){      
      await this.apiService.getAccessToken()
      this.isTokenRetrieved = true

    }
    console.log('no functionality')
  }
  public async sixMonthClick(){
    if (!this.isTokenRetrieved){      
      await this.apiService.getAccessToken()
      this.isTokenRetrieved = true

    }
    console.log('no functionality')

  }
  
  public async lastYearClick(){
    if (!this.isTokenRetrieved){      
      await this.apiService.getAccessToken()
      this.isTokenRetrieved = true

    }
    console.log('no functionality')

  }
}
