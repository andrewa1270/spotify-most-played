import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable, from, of, switchMap } from 'rxjs';
import { CLIENT_ID, CLIENT_SECRET } from 'src/spotify-variables';
import { Token } from 'src/types';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private code?: any;
  private encoded: string = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
  private token_info$?: string;

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
        this.token_info$ = JSON.stringify(token);
        return of(token);
      })
    );
  }

  public returnAccessToken(): string {
    /* 
      TODO - Check if access_token has expired here. use time to check
     */
    if (this.token_info$ != null) {
      const jsonToken : Token = JSON.parse(this.token_info$);
      const access_token = jsonToken["access_token"].toString();
      return access_token;
    }
    return 'NONE FOUND'; // no access token
  }

  public getTopTracks(time_range: string): void {
    this.getAccessToken().subscribe(() => {
      const access_token = this.returnAccessToken();
      const url = `https://api.spotify.com/v1/me/top/tracks?time_range=${time_range}&limit=20`; // TODO: Add to variable

      const headers = new HttpHeaders({
        "Authorization": `Bearer ${access_token}`,
      });

      fetch(url, {
        method: 'GET',
        headers: {
          "Authorization": `Bearer ${access_token}`,
          // 'Content-Type' : 'application/x-www-form-urlencoded'
        },
      }).then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error fetching top tracks:', error));
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
