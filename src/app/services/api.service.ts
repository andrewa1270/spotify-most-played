import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable, from, of, switchMap } from 'rxjs';
import { CLIENT_ID, CLIENT_SECRET } from 'src/spotify-variables';
import { Token, TopTracksEndpoint } from 'src/types';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private code?: any;
  private encoded: string = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
  private token_info$?: Token;

  constructor(private route:ActivatedRoute) { }

  public getAccessToken(): Observable<any> {
    return this.route.queryParamMap.pipe(
      switchMap(url => {
        this.code = url.get('code');
        return this.requestAccessToken(); // assign value to token_info$ 
      })
    );
  }
  

  private requestAccessToken(): Observable<any> {
    

      if (this.token_info$){
        if (((new Date().getTime()) / 1000 - (this.token_info$.start_time.getTime()) / 1000) < 0){
          // timer ran out
          const body = new HttpParams()
          .set('grant_type', 'refresh_token')
          .set('refresh_token', this.token_info$.refresh_token)
          .set('client_id', CLIENT_ID);

          return from(fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: body.toString()
          })).pipe(
            switchMap(response => response.json()),
            switchMap((token: Token) => {
              this.token_info$ = {...token, start_time: new Date()}
              return of(token);
            })
          )
        } else {
          return of(this.token_info$)
        }
      } 
      else {
        const body = new HttpParams()
        .set('grant_type', 'authorization_code')
        .set('code', this.code)
        .set('redirect_uri', 'http://localhost:4200/');

        return from(fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Authorization': 'Basic ' + this.encoded,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: body.toString()
        })).pipe(
          switchMap(response => response.json()),
          switchMap((token: Token) => {
            this.token_info$ = {...token, start_time: new Date()}
            return of(token);
          })
        );
      }
  }

  public returnAccessToken(): string {
    /* 
      TODO - Check if access_token has expired here. use time to check
     */
    if (this.token_info$ != null) {
      const access_token = this.token_info$["access_token"].toString();
      return access_token;
    }
    return 'NONE FOUND'; // no access token
  }

  public getTopTracks(time_range: string): any[] {
    const topTracks: any[] = []
    this.getAccessToken().subscribe(() => {
      const access_token = this.returnAccessToken();
      const url = `https://api.spotify.com/v1/me/top/tracks?time_range=${time_range}&limit=20`; // TODO: Add to variable

      return fetch(url, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${access_token}`,
        },
      }).then(response => response.json())
        .then((data: TopTracksEndpoint) => data.items.map(track => topTracks.push(track.name)))
        .catch(error => console.error('Error fetching top tracks:', error));
    });

    return topTracks
  }

  public accessToken() {
  }

  getCode(): string { 
    this.route.queryParamMap.subscribe(paramMap => {
      this.code = paramMap.get('code');
    });
    return this.code;
  }

}
