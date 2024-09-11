import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ArtistInfo, TrackMetadata } from 'src/types';

@Component({
  selector: 'app-last-year',
  templateUrl: './last-year.component.html',
  styleUrls: ['./last-year.component.css']
})
export class LastYearComponent {
  constructor(private apiService: ApiService){
    this.getTopTracks()
  }

  public topTracks: TrackMetadata[] = []

  public getTopTracks(): void {
    this.topTracks = this.apiService.getTopTracks('long_term')

  }

  public formatArtists(artists: ArtistInfo[]): string{
    return artists.map(artist_details => artist_details.name).join(', ')
  }
}
