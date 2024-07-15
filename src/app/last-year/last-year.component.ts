import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Item } from 'src/types';

@Component({
  selector: 'app-last-year',
  templateUrl: './last-year.component.html',
  styleUrls: ['./last-year.component.css']
})
export class LastYearComponent {
  constructor(private apiService: ApiService){
    this.getTopTracks()
  }

  public topTracks: Item[] = []

  public getTopTracks(): void {
    this.topTracks = this.apiService.getTopTracks('long_term')

  }
}
