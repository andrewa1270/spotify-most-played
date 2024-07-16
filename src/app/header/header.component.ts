import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CLIENT_ID, REDIRECT_URI, SCOPE } from 'src/spotify-variables';
import { HeaderOptions } from 'src/types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  private _activeTab?: HeaderOptions

  public set activeTab(tab: HeaderOptions) {
    this._activeTab = tab;
  }

  constructor( private apiService:ApiService){}

  public loginClick() {
    // Trigger Spotify OAuth flow
    window.location.href = (`https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}`);
  }

  public setTabClass(tab: HeaderOptions): string {
    return tab === this._activeTab ? 'rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white' : 'rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white'
  }
}
