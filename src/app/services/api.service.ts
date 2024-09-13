import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable, from, lastValueFrom, of, switchMap } from 'rxjs';
import { CLIENT_ID, CLIENT_SECRET } from 'src/spotify-variables';
import { TrackMetadata, TrackInfo, Token, TopTracksEndpoint } from 'src/types';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private code?: any;
  private encoded: string = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

  public topArtists: TrackMetadata[] = []

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
    const tokenInfo = localStorage.getItem('token_info$')
      if (tokenInfo){
        const parsedTokenInfo: Token = JSON.parse(tokenInfo)
        if (((new Date().getTime()) / 1000 - (parsedTokenInfo.start_time.getTime()) / 1000) < 0){
          // timer ran out
          const body = new HttpParams()
          .set('grant_type', 'refresh_token')
          .set('refresh_token', parsedTokenInfo.refresh_token)
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
              // Convert the object to a JSON string and save it to localStorage
              localStorage.setItem('token_info$', JSON.stringify({...token, start_time: new Date()}))
              return of(token);
            })
          )
        } else {
          return of(localStorage.getItem('token_info$'))
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
            // Convert the object to a JSON string and save it to localStorage
            localStorage.setItem('token_info$', JSON.stringify({...token, start_time: new Date()}))
            return of(token);
          })
        );
      }
  }

  public returnAccessToken(): string {
    const tokenInfoInStorage = (localStorage.getItem('token_info$'))
    if (tokenInfoInStorage != null) {
      const tokenInfo: Token = JSON.parse(tokenInfoInStorage)
      return tokenInfo.access_token
    }
    return 'NONE FOUND'; // no access token
  }

  public getTopTracks(time_range: string): TrackMetadata[] {
    const topTracks: TrackMetadata[] = []
    this.getAccessToken().subscribe(() => {
      const access_token = this.returnAccessToken();
      const url = `https://api.spotify.com/v1/me/top/tracks?time_range=${time_range}&limit=20`; // TODO: Add to variable

      return fetch(url, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${access_token}`,
        },
      }).then(response => response.json())
        .then((data: TrackInfo) => data.items.map(track => topTracks.push(track)))
        .catch(error => console.error('Error fetching top tracks:', error));
    });

    return topTracks
  }
  
  public getTopArtists(time_range: string): void {
    this.getAccessToken().subscribe(() => {
      const access_token = this.returnAccessToken();
      const url = `https://api.spotify.com/v1/me/top/artists?time_range=${time_range}&limit=20`; // TODO: Add to variable

      return fetch(url, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${access_token}`,
        },
      }).then(response => response.json())
        .then((data: TrackInfo) => data.items.map(artist => this.topArtists.push(artist)))
        .catch(error => console.error('Error fetching top artists:', error));
    });
    
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
