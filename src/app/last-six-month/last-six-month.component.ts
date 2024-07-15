import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Item } from 'src/types';

@Component({
  selector: 'app-last-six-month',
  templateUrl: './last-six-month.component.html',
  styleUrls: ['./last-six-month.component.css']
})
export class LastSixMonthComponent {
  constructor(private apiService: ApiService){
    this.getTopTracks()
  }

  public topTracks: Item[] = []

  public getTopTracks(): void {
    this.topTracks = this.apiService.getTopTracks('medium_term')

  }
}
