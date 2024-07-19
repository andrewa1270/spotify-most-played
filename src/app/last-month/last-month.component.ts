import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { TrackMetadata } from 'src/types';

@Component({
  selector: 'app-last-month',
  templateUrl: './last-month.component.html',
  styleUrls: ['./last-month.component.css']
})
export class LastMonthComponent {
  constructor(private apiService: ApiService){
    this.getTopTracks()
  }

  public topTracks: TrackMetadata[] = []

  public getTopTracks(): void {
    this.topTracks = this.apiService.getTopTracks('short_term')

  }
}
