import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RetrieveTopSongsService {

  constructor(private http: HttpClient) { }

  private _topSongs: any

  public get topSongs(){
    return this._topSongs
  }

  public set topSongs(value: any){
    this._topSongs = value
  }

  //   getTopSongs(timeRange: String): Observable<any>{
  //     const topSongs = this.http.get(`http://127.0.0.1:5000/top-songs/${timeRange}`, {withCredentials: true });
  //     return topSongs
  // }

  // getSessionToken(): Observable<any>{
  //   const token_info = this.http.get('http://127.0.0.1:5000/profile');
  //   token_info.subscribe(token => console.log(token))
  //   return token_info
  // }
}
