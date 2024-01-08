import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CLIENT_ID, CLIENT_SECRET } from 'src/details';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private token_info?: string
  private code!: any;
  // private encoded: string = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
  private encoded: string = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);

  private body = new HttpParams()
  .set('grant_type', 'authorization_code')
  .set('code', this.getCode()) // This should only be used per 1 request
  .set('redirect_uri', 'http://localhost:4200/')

  private headers  = new HttpHeaders({
    'Authorization': 'Basic ' + this.encoded,
    'Content-Type' : 'application/x-www-form-urlencoded'
  })

  constructor( private http:HttpClient, private route:ActivatedRoute ) { }

  getAccessToken() {
    this.route.queryParamMap.subscribe(paramMap => {
      this.code = paramMap.get('code');
      this.requestAccessToken();
    });
  }
  
  private requestAccessToken() {
    if (this.code) {
      const body = new HttpParams()
        .set('grant_type', 'authorization_code')
        .set('code', this.code)
        .set('redirect_uri', 'http://localhost:4200/');
  
      this.http.post("https://accounts.spotify.com/api/token", body.toString(), { headers: this.headers }).subscribe(
        response => {
          this.token_info = JSON.stringify(response);
          console.log('Token Info:', this.token_info);
        },
        error => {
          console.error('Error obtaining access token:', error);
        }
      );
    }

    console.log(this.token_info)
  }
  

  getCode(): string{ //TODO: Add correct type annotation
    this.route.queryParamMap.subscribe(paramMap => {
      this.code = paramMap.get('code');
      return this.code
    })
    return ''
  }

}
