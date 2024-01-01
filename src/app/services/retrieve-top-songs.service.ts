import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RetrieveTopSongsService {

  constructor(private http: HttpClient) { }

    getTopSongs(timeRange: String): Observable<any>{
      const topSongs = this.http.get(`http://127.0.0.1:5000/top-songs/${timeRange}`);
      // const topSongs = this.http.get('http://127.0.0.1:5000/test'); # This works
      topSongs.subscribe(songs => console.log(songs))
      return topSongs
  }
}
