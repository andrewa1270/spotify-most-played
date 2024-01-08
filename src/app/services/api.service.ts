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
  private encoded: string = btoa(CLIENT_ID + ':' + CLIENT_SECRET);

  private body = new HttpParams()
  .set('grant_type', 'authorization_code')
  .set('code', 'CODE') // Replace CODE with actual code
  .set('redirect_uri', 'http://localhost:4200/')

  private headers  = new HttpHeaders({
    'Authorization': 'Authorization: Basic ' + this.encoded,
    'Content-Type' : 'application/x-www-form-urlencoded'
  })

  constructor( private http:HttpClient, private route:ActivatedRoute ) { }

  getAccessToken(){
    this.http.post("https://accounts.spotify.com/api/token", this.body.toString(), { headers: this.headers }).subscribe(
      response => {
        this.token_info = JSON.stringify(response)
        return response
      }
    )
  }

  testRespone(){
    this.getAccessToken()
    console.log(this.token_info) 
  }

  getCode():string{ //TODO: Add correct type annotation
    this.route.queryParamMap.subscribe(paramMap => {
      this.code = paramMap.get('code');
      console.log('URL CODE IS: ' + this.code)
      return this.code
    })
    return ''
  }

}
